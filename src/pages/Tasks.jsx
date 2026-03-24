import { useState } from 'react';
import { useStudy } from '../context/StudyContext';

function Tasks() {
    const { tasks, subjects, addTask, updateTaskStatus } = useStudy();

    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [priority, setPriority] = useState("Medium");

    const handleAdd = (e) => {
        e.preventDefault();
        if (!title) return;

        addTask({ title, subject, priority });

        setTitle("");
        setSubject("");
        setPriority("Medium");

    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Tasks</h1>

            <form
                onSubmit={handleAdd}
                className="bg-[#1e293b] p-6 rounded-2xl shadow mb-6 max-w-xl"
            >
                <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg bg-[#0f172a] border border-gray-700"
                />

                <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg bg-[#0f172a] border border-gray-700"
                >
                    <option value="">Select Subject</option>
                    {subjects.map((sub) => (
                        <option key={sub.id} value={sub.name}>
                            {sub.name}
                        </option>
                    ))}
                </select>

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg bg-[#0f172a] border border-gray-700"
                >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>

                <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg">
                    Add Task
                </button>
            </form>

            <div className="space-y-4">
                {tasks.length === 0 ? (
                    <p className="text-gray-400">No tasks yet</p>
                ) : (
                    tasks.map((task) => (
                        <div
                            key={task.id}
                            className="bg-[#1e293b] p-4 rounded-xl flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-semibold">{task.title}</h3>
                                <p className="text-sm text-gray-400">
                                    {task.subject} • {task.priority}
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    updateTaskStatus(
                                        task.id,
                                        task.status === "Completed" ? "Pending" : "Completed"
                                    )
                                }
                                className={`px-3 py-1 rounded-lg text-sm ${task.status === "Completed"
                                        ? "bg-green-600"
                                        : "bg-yellow-600"
                                    }`}
                            >
                                {task.status}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Tasks;