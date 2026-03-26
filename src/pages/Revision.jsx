import { useState } from "react";
import { useStudy } from "../context/StudyContext";

export default function Revision() {
  const { tasks, subjects, toggleRevision, updateTaskStatus } = useStudy();
  const [filterSubject, setFilterSubject] = useState("All");

  const revisionTasks = tasks.filter((task) => task.needsRevision);

  const filtered =
    filterSubject === "All"
      ? revisionTasks
      : revisionTasks.filter((t) => t.subject === filterSubject);

  // tasks NOT yet flagged for revision
  const availableTasks = tasks.filter((t) => !t.needsRevision);

  const priorityColor = {
    High: "text-red-400",
    Medium: "text-yellow-400",
    Low: "text-green-400",
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-3xl font-bold mb-2">Revision</h1>
      <p className="text-gray-400 mb-6">
        Flag tasks that you need to revisit and track your revision progress.
      </p>

      {/* ── Add to Revision ── */}
      {availableTasks.length > 0 && (
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow mb-8 max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">Add Tasks to Revision</h2>

          <ul className="space-y-3">
            {availableTasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-[#0f172a] p-3 rounded-lg"
              >
                <div>
                  <span className="font-medium">{task.title}</span>
                  <span className="text-gray-500 text-sm ml-2">
                    {task.subject || "No subject"}
                  </span>
                </div>

                <button
                  onClick={() => toggleRevision(task.id)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-sm px-3 py-1 rounded-lg transition"
                >
                  + Revision
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Revision List ── */}
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            Revision List{" "}
            <span className="text-gray-500 text-base font-normal">
              ({filtered.length})
            </span>
          </h2>

          {revisionTasks.length > 0 && (
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="bg-[#1e293b] border border-gray-700 rounded-lg px-3 py-1 text-sm"
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
            {filtered.map((task) => (
              <li
                key={task.id}
                className="bg-[#1e293b] p-4 rounded-xl flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-400">
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
                    className={`text-sm px-3 py-1 rounded-lg transition ${
                      task.status === "Completed"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-yellow-600 hover:bg-yellow-700"
                    }`}
                  >
                    {task.status}
                  </button>

                  <button
                    onClick={() => toggleRevision(task.id)}
                    className="bg-red-600 hover:bg-red-700 text-sm px-3 py-1 rounded-lg transition"
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
  );
}
