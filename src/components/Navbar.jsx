import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      location.pathname === path
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-gray-800/50 px-6 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            NeuroNest
          </span>
        </Link>

        <div className="flex gap-1">
          <Link to="/dashboard" className={linkClass("/dashboard")}>
            Dashboard
          </Link>
          <Link to="/subjects" className={linkClass("/subjects")}>
            Subjects
          </Link>
          <Link to="/tasks" className={linkClass("/tasks")}>
            Tasks
          </Link>
          <Link to="/revision" className={linkClass("/revision")}>
            Revision
          </Link>
          <Link to="/ai-tools" className={linkClass("/ai-tools")}>
            AI Tools
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;