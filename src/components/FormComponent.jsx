import React, { useState } from 'react'
import useTodo from '../store/useTodo';

const FormComponent = () => {

    const [inputValue, setInputValue] = useState({ id: "", content: "", checked: false });
    const { tasks, addTask } = useTodo();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const { content } = inputValue;

        const isAvailable = tasks.find((task) => task.content === content);

        if (!content || isAvailable) {
            setInputValue({ id: "", content: "", checked: false });
            return;
        }

        addTask(content);
        setInputValue({ id: "", content: "", checked: false });

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
