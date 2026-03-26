import { useStudy } from "../context/StudyContext";

export default function Dashboard() {
  const { subjects, topics, tasks } = useStudy();

  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const pendingTasks = tasks.filter((t) => t.status === "Pending").length;

  const stats = [
    { label: "Subjects", value: subjects.length, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
    { label: "Topics", value: topics.length, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { label: "Completed", value: completedTasks, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { label: "Pending", value: pendingTasks, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-gray-400 mb-8">Your study progress at a glance.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`${s.bg} border ${s.border} p-5 rounded-2xl transition-transform duration-200 hover:scale-[1.03]`}
            >
              <p className="text-gray-400 text-sm mb-1">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#1e293b]/60 border border-gray-800/50 p-6 rounded-2xl">
          <h2 className="text-lg font-semibold mb-4">Recent Tasks</h2>

          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet — create one from the Tasks page.</p>
          ) : (
            <ul className="space-y-2">
              {tasks.slice(-5).reverse().map((task, i) => (
                <li
                  key={task.id}
                  className="flex justify-between items-center bg-[#0f172a]/60 p-3 rounded-xl animate-fade-in"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div>
                    <span className="font-medium">{task.title}</span>
                    {task.subject && (
                      <span className="text-gray-500 text-sm ml-2">
                        {task.subject}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      task.status === "Completed"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-amber-500/15 text-amber-400"
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
    </div>
  );
}