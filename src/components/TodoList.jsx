import React, { useEffect, useState } from 'react'
import FormComponent from './FormComponent'
import TodoTable from './TodoTable';
import useTodo from '../store/useTodo';

const TodoList = () => {

    const {fetchData} = useTodo();

    return (
        <div className='flex flex-col gap-10 items-center w-[60%]'>
            <h1 className='text-4xl font-extrabold'>Todo List</h1>
            <FormComponent/>
            <button onClick={fetchData} className='bg-(--secondary-bg-color) p-[10px_20px] font-extrabold cursor-pointer rounded-lg'>Fetch Data</button>
            <TodoTable />
        </div>
    )
}

export default TodoList
