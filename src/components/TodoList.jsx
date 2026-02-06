import React, { useEffect, useState } from 'react'
import FormComponent from './FormComponent'
import TodoTable from './TodoTable';
import { fetchData, store } from '../store';
import { useDispatch } from 'react-redux';

const TodoList = () => {
    
    const dispatch = useDispatch();

    const handleFetchData = () => {
        return dispatch(fetchData());
    }
    
    return (
        <div className='flex flex-col gap-10 items-center w-[60%]'>
            <h1 className='text-4xl font-extrabold'>Todo List</h1>
            <FormComponent/>
            <button className='bg-(--secondary-bg-color) p-[10px_20px] font-extrabold cursor-pointer rounded-lg' onClick={handleFetchData}>Fetch Data</button>
            <TodoTable/>
        </div>
    )
}

export default TodoList
