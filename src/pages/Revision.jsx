import { useState } from "react";
import { useStudy } from "../context/StudyContext";

export default function Revision() {
  const { tasks, subjects, toggleRevision, updateTaskStatus } = useStudy();
  const [filterSubject, setFilterSubject] = useState("All");

  const revisionTasks = tasks.filter((t) => t.needsRevision);
  const filtered =
    filterSubject === "All"
      ? revisionTasks
      : revisionTasks.filter((t) => t.subject === filterSubject);

  const availableTasks = tasks.filter((t) => !t.needsRevision);

  const priorityColor = {
    High: "text-red-400",
    Medium: "text-amber-400",
    Low: "text-emerald-400",
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">Revision</h1>
        <p className="text-gray-400 mb-8">
          Flag tasks you need to revisit and track your revision progress.
        </p>

        {availableTasks.length > 0 && (
          <div className="bg-[#1e293b]/60 border border-gray-800/50 p-6 rounded-2xl mb-8 max-w-2xl">
            <h2 className="text-lg font-semibold mb-4">Add Tasks to Revision</h2>
            <ul className="space-y-2">
              {availableTasks.map((task, i) => (
                <li
                  key={task.id}
                  className="flex justify-between items-center bg-[#0f172a]/60 p-3 rounded-xl animate-fade-in"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div>
                    <span className="font-medium">{task.title}</span>
                    <span className="text-gray-500 text-sm ml-2">
                      {task.subject || "No subject"}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleRevision(task.id)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
                  >
                    + Revision
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Revision List{" "}
              <span className="text-gray-500 text-base font-normal">
                ({filtered.length})
              </span>
            </h2>

            {revisionTasks.length > 0 && (
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="bg-[#1e293b] border border-gray-700 rounded-xl px-3 py-1.5 text-sm"
              >
                <option value="All">All Subjects</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {filtered.length === 0 ? (
            <p className="text-gray-500">
              No tasks in your revision list yet. Add some from above!
            </p>
          ) : (
            <ul className="space-y-3">
              {filtered.map((task, i) => (
                <li
                  key={task.id}
                  className="bg-[#1e293b]/60 border border-gray-800/50 p-4 rounded-xl flex justify-between items-center transition-all duration-200 hover:border-gray-700 animate-fade-in"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-gray-400 mt-0.5">
                      {task.subject || "—"} •{" "}
                      <span className={priorityColor[task.priority] || ""}>
                        {task.priority}
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-2">
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

                    <button
                      onClick={() => toggleRevision(task.id)}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
