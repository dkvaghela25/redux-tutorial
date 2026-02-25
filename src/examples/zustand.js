/* eslint-disable no-unused-vars */

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const todoStore = (set) => ({
    tasks: [{ id: 'temp', content: 'temp', checked: false }],
    addTask: (task) => set((state => {
        const newTask = { id: task, content: task, checked: false }
        const updatedTasks = [...state.tasks, newTask]
        return { tasks: updatedTasks }
    })),
    deleteTask: (taskId) => set((state => {
        const updatedTasks = state.tasks.filter(task => task.id !== taskId)
        return { tasks: updatedTasks }
    })),
    updateTask: (taskId) => set((state => {
        const updatedTasks = state.tasks.map(task => task.id === taskId ? { ...task, checked: !task.checked } : task)
        return { tasks: updatedTasks }
    })),
    clearAll: () => set(state => {
        return { tasks: [] }
    }),
    fetchData: async () => {

        const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3');
        const data = await res.json();

        const newTasks = data.map(task => { return { id: task.title, content: task.title, checked: false } })

        set((state) => ({
            tasks: [...state.tasks, ...newTasks]
        }));
    }
})

const useTodo = create(
    devtools(
        persist(todoStore, {
            name: "todos"
        })
    )
);

export default useTodo;