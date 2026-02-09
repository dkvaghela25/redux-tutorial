import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
            localStorage.setItem('todoList',JSON.stringify(state.tasks));
        },
        deleteTask(state, action) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
            localStorage.setItem('todoList',JSON.stringify(state.tasks));
        },
        updateTask(state, action) {
            state.tasks = state.tasks.map(task => {
                if (task.id === action.payload) {
                    return { ...task, checked: !task.checked }
                } else {
                    return task
                }
            });
            localStorage.setItem('todoList',JSON.stringify(state.tasks));
        },
        clearAll(state, action) {
            state.tasks = [];
            localStorage.setItem('todoList',JSON.stringify(state.tasks));
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            const newTasks = action.payload.map(task => {
                return { id: task.title, content: task.title, checked: false }
            })
            console.log("newTasks",newTasks);
            state.tasks.push(...newTasks);
            localStorage.setItem('todoList',JSON.stringify(state.tasks));
        })
    }
})

export const { addTask, deleteTask, updateTask, clearAll } = taskReducer.actions;

export default taskReducer.reducer;