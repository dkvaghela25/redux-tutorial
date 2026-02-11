import { create } from "zustand";

const todoStore = (set) => ({
    tasks: [{ id: 'temp', content: 'temp', checked: false }],
    addTask: (task) => set((state => {
        const newTask = { id: task, content: task, checked: false }
        const updatedTasks = [...state.tasks, newTask]
        return { ...state, tasks: updatedTasks }
    })),
    deleteTask: (taskId) => set((state => {
        const updatedTasks = state.tasks.filter(task => task.id !== taskId)
        return { ...state, tasks: updatedTasks }
    })),
    updateTask: (taskId) => set((state => {
        const updatedTasks = state.tasks.map(task => task.id === taskId ? { ...task, checked: !task.checked } : task)
        return { ...state, tasks: updatedTasks }
    })),
    clearAll: () => set(state => {
        return { ...state, tasks: [] }
    }),
    fetchData: () => set(async (state) => {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3');
        const data = await res.json();
        console.log(data);
        const newTasks = data.map(task => { return { id: task.title, content: task.title, checked: false } })
        console.log(newTasks);
        const updatedTasks = [...state.tasks, ...newTasks];
        console.log(updatedTasks);
        return { ...state, tasks: updatedTasks }
    })
})

const useTodo = create(todoStore);

export default useTodo;