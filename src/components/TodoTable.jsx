import React from 'react'
import Task from './Task'
import useTodo from '../store/useTodo'

const TodoTable = () => {

    const { tasks, clearAll } = useTodo();

    return (
        <div className='flex flex-col w-[50%] gap-10'>
            {tasks.map((curElem, index) => {
                return <Task key={index} task={curElem} />
            })}
            <button onClick={clearAll} className='bg-red-500 w-fit self-center rounded-lg p-[10px_20px] font-extrabold cursor-pointer'>Clear All</button>
        </div>
    )
}

export default TodoTable
