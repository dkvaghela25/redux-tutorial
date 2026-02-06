import React from 'react'
import Task from './Task'
import { useDispatch, useSelector } from 'react-redux'
import { clearAll } from '../store'

const TodoTable = () => {

    const tasks = useSelector(state => state.taskReducer.tasks)
    const dispatch = useDispatch();

    const handleClearAll = () => {
        return dispatch(clearAll());
    }
    console.log(tasks);
    
    return (
        <div className='flex flex-col w-[50%] gap-10'>
            {tasks.map((curElem,index) => {
                return <Task key={index} task={curElem}/>
            })}
            <button className='bg-red-500 w-fit self-center rounded-lg p-[10px_20px] font-extrabold cursor-pointer' onClick={handleClearAll}>Clear All</button>
        </div>
    )
}

export default TodoTable
