import { useStudy } from "../context/StudyContext";

export default function Dashboard() {
  const { subjects, tasks } = useStudy();

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow">
          <h2 className="text-gray-400">Subjects</h2>
          <p className="text-3xl font-bold">{subjects.length}</p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl shadow">
          <h2 className="text-gray-400">Completed</h2>
          <p className="text-3xl font-bold text-green-400">
            {completedTasks}
          </p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl shadow">
          <h2 className="text-gray-400">Pending</h2>
          <p className="text-3xl font-bold text-red-400">
            {pendingTasks}
          </p>
        </div>
      </div>

      <div className="mt-8 bg-[#1e293b] p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>

        {tasks.length === 0 ? (
          <p className="text-gray-400">No tasks yet</p>
        ) : (
          <ul className="space-y-3">
            {tasks.slice(0, 5).map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-[#0f172a] p-3 rounded-lg"
              >
                <span>{task.title}</span>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    task.status === "Completed"
                      ? "bg-green-900 text-green-300"
                      : "bg-yellow-900 text-yellow-300"
                  }`}
                >
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}