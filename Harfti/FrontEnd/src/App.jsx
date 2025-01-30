import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaCheck } from "react-icons/fa";

const API_URL = "http://localhost:5000/tasks";

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await axios.get(API_URL);
        setTasks(res.data);
    };

    const addTask = async () => {
        if (!newTask.trim()) return;
        await axios.post(API_URL, { title: newTask });
        setNewTask("");
        fetchTasks();
    };

    const toggleComplete = async (id, completed) => {
        await axios.put(`${API_URL}/${id}`, { completed: !completed });
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchTasks();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
            <div className="flex mb-4">
                <input 
                    className="border p-2 w-64" 
                    placeholder="New task..." 
                    value={newTask} 
                    onChange={(e) => setNewTask(e.target.value)} 
                />
                <button className="bg-blue-500 text-white px-4" onClick={addTask}>Add</button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id} className="flex items-center mb-2">
                        <span 
                            className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`} 
                            onClick={() => toggleComplete(task._id, task.completed)}
                        >
                            {task.title}
                        </span>
                        <button className="ml-2 text-green-500" onClick={() => toggleComplete(task._id, task.completed)}>
                            <FaCheck />
                        </button>
                        <button className="ml-2 text-red-500" onClick={() => deleteTask(task._id)}>
                            <FaTrash />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
