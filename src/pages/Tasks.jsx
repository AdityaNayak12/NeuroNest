import { useState } from "react";
import { useStudy } from "../context/StudyContext";

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

  const priorityBadge = {
    High: "bg-red-500/15 text-red-400",
    Medium: "bg-amber-500/15 text-amber-400",
    Low: "bg-emerald-500/15 text-emerald-400",
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">Tasks</h1>
        <p className="text-gray-400 mb-8">Create and manage your study tasks.</p>

        <form
          onSubmit={handleAdd}
          className="bg-[#1e293b]/60 border border-gray-800/50 p-6 rounded-2xl mb-8 max-w-xl"
        >
          <h2 className="text-lg font-semibold mb-4">Add New Task</h2>

          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-3 rounded-xl bg-[#0f172a] border border-gray-700 text-sm"
          />

          <div className="grid grid-cols-2 gap-3 mb-4">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="p-3 rounded-xl bg-[#0f172a] border border-gray-700 text-sm"
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
              className="p-3 rounded-xl bg-[#0f172a] border border-gray-700 text-sm"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <button className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-xl text-sm font-medium transition-colors">
            Add Task
          </button>
        </form>

        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet — create one above.</p>
          ) : (
            tasks.map((task, i) => (
              <div
                key={task.id}
                className="bg-[#1e293b]/60 border border-gray-800/50 p-4 rounded-xl flex justify-between items-center transition-all duration-200 hover:border-gray-700 animate-fade-in"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {task.subject && (
                        <span className="text-xs text-gray-500">{task.subject}</span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${priorityBadge[task.priority]}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    updateTaskStatus(
                      task.id,
                      task.status === "Completed" ? "Pending" : "Completed"
                    )
                  }
                  className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                    task.status === "Completed"
                      ? "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25"
                      : "bg-amber-500/15 text-amber-400 hover:bg-amber-500/25"
                  }`}
                >
                  {task.status}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Tasks;