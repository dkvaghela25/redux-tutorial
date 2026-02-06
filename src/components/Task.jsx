import React from 'react'
import { MdOutlineTaskAlt } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, updateTask } from '../store';

const Task = ({ task }) => {

  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    return dispatch(deleteTask(task.id))
  }
  
  const handleCheck = () => {
    return dispatch(updateTask(task.id))
  }

  return (
    <div className=' w-full flex justify-between p-[10px_20px] bg-white text-black rounded-4xl items-center'>
      <div className={`${task.checked ? "line-through" : ""}`}>{task.content}</div>
      <div className="flex items-center gap-3">
        <MdOutlineTaskAlt onClick={handleCheck} className='text-green-500 w-8 h-8 cursor-pointer' />
        <MdDeleteForever onClick={handleDeleteTask} className='text-red-500 w-8 h-8 cursor-pointer' />
      </div>
    </div>
  )
}

export default Task
