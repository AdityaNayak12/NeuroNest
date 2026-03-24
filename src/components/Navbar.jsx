import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-indigo-600 text-white"
        : "text-gray-300 hover:bg-gray-700"
    }`;

  return (
    <nav className="bg-[#020617] border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">NeuroNest 🧠</h1>

      <div className="flex gap-2">
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          Dashboard
        </Link>
        <Link to="/subjects" className={linkClass("/subjects")}>
          Subjects
        </Link>
        <Link to="/tasks" className={linkClass("/tasks")}>
          Tasks
        </Link>
        <Link to="/ai-tools" className={linkClass("/ai-tools")}>
          AI Tools
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;