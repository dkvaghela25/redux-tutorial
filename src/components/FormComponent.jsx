import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../features/tasks/taskSlice';

const FormComponent = ({ todoList, setTodoList }) => {

    const [inputValue, setInputValue] = useState({ id: "", content: "", checked: false });
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.taskReducer.tasks)

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const { content } = inputValue;

        const isAvailable = tasks.find((task) => task.content === content);

        if (!content || isAvailable) {
            setInputValue({ id: "", content: "", checked: false });
            return;
        }

        setInputValue({ id: "", content: "", checked: false });

        return dispatch(addTask(content));

    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        const updatedInputValue = { id: value, content: value, checked: false }
        setInputValue(updatedInputValue)
    }

    return (
        <form className='flex rounded-lg overflow-hidden bg-white' onSubmit={handleFormSubmit}>
            <input
                className='bg-white p-[10px_20px] w-75 text-black'
                type="text"
                value={inputValue.content}
                onChange={(e) => handleInputChange(e)}
            />
            <input className='bg-(--secondary-bg-color) p-[10px_20px] font-extrabold cursor-pointer' type="submit" value={'Add Task'} />
        </form>
    )
}

export default FormComponent
