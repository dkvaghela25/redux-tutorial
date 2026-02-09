import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskReducer from './features/tasks/taskSlice'

export const store = configureStore({
    reducer: {
        taskReducer,
    }
})
