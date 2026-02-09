import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk'

const ADD_TASK = 'task/add'
const DELETE_TASK = 'task/delete'
const UPDATE_TASK = 'task/update'
const CLEAR_ALL = 'tasks/clearAll'
const FETCH_DATA = 'tasks/fetch'

const data = JSON.parse(localStorage.getItem('todoList'))

const initialState = {
    tasks: data || []
}

const taskReducer = (state = initialState, action) => {
    let updatedTasks;

    switch (action.type) {

        case ADD_TASK:
            updatedTasks = [...state.tasks, action.payload]
            return {
                ...state,
                tasks: updatedTasks
            }

        case DELETE_TASK:
            updatedTasks = state.tasks.filter(task => task.id !== action.payload)
            return {
                ...state,
                tasks: updatedTasks
            }

        case UPDATE_TASK:
            updatedTasks = state.tasks.map(task => {
                if (task.id === action.payload) {
                    return { ...task, checked: !task.checked }
                } else {
                    return task
                }
            });

            return {
                ...state,
                tasks: updatedTasks
            }

        case FETCH_DATA:
            const newTasks = action.payload.map(task => {
                return { id: task.title, content: task.title, checked: false }
            })
            updatedTasks = [...state.tasks, ...newTasks]
            console.log("updatedTasks",updatedTasks);

            return {
                ...state,
                tasks: updatedTasks
            }

        case CLEAR_ALL:
            updatedTasks = [];
            return {
                ...state,
                tasks: updatedTasks
            }

        default:
            return state;
    }
}

export const store = createStore(taskReducer, composeWithDevTools(applyMiddleware(thunk)));

export const addTask = (data) => {
    return { type: ADD_TASK, payload: { id: data, content: data, checked: false } }
}

export const deleteTask = (id) => {
    return { type: DELETE_TASK, payload: id }
}

export const updateTask = (id) => {
    return { type: UPDATE_TASK, payload: id }
}

export const clearAll = () => {
    return { type: CLEAR_ALL }
}

export const fetchData = () => {
    return async () => {
        try {
            console.log("Fetching Data");
            const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3');
            const data = await res.json();
            store.dispatch({ type: FETCH_DATA, payload: data });
        } catch (error) {
            console.log(error);
        }
    }
}

// console.log('store : ', store);
// console.log('initial state : ', store.getState());

// store.dispatch({ type: ADD_TASK, payload: { id: "Buy Mangos", content: "Buy Mangos", checked: false } })
// console.log('updated state 1 : ', store.getState());

// store.dispatch(addTask("Buy Apples"))
// console.log('updated state 2 : ', store.getState());

// store.dispatch(addTask("Buy Oranges"))
// console.log('updated state 3 : ', store.getState());

// store.dispatch(deleteTask("Buy Apples"))
// console.log('updated state 4 : ', store.getState());
