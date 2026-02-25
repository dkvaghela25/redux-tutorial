/* eslint-disable no-unused-vars */

import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const data = JSON.parse(localStorage.getItem('todoList'))

const initialState = {
    tasks: data || []
}

export const fetchData = createAsyncThunk('tasks/fetchData', async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3');
    const data = res.json();
    return data;
})

const taskReducer = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask(state, action) {
            const newTask = { id: action.payload, content: action.payload, checked: false }
            state.tasks.push(newTask);
        },
        deleteTask(state, action) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },
        updateTask(state, action) {
            state.tasks = state.tasks.map(task => {
                if (task.id === action.payload) {
                    return { ...task, checked: !task.checked }
                } else {
                    return task
                }
            });
        },
        clearAll(state, action) {
            state.tasks = [];
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            const newTasks = action.payload.map(task => {
                return { id: task.title, content: task.title, checked: false }
            })
            console.log("newTasks",newTasks);
            state.tasks.push(...newTasks);
        })
    }
})

console.log(taskReducer);

export const { addTask, deleteTask, updateTask, clearAll } = taskReducer.actions;

export const store = configureStore({
    reducer: {
        taskReducer: taskReducer.reducer,
    }
})

// console.log('store : ', store);
// console.log('initial state : ', store.getState());

// store.dispatch(addTask("Apple"))
// console.log('updated state 1 : ', store.getState());

// store.dispatch(addTask("Mango"))
// console.log('updated state 2 : ', store.getState());

// store.dispatch(addTask("Orange"))
// console.log('updated state 3 : ', store.getState());

// store.dispatch(deleteTask("Mango"))
// console.log('updated state 4 : ', store.getState());

// store.dispatch(updateTask("Orange"))
// console.log('updated state 5 : ', store.getState());

// store.dispatch(clearAll())
// console.log('updated state 6 : ', store.getState());

// store.dispatch(fetchData())
// console.log('updated state 7 : ', store.getState());
