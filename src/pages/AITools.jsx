import { useState } from "react";
import { useStudy } from "../context/StudyContext";
import { generateSummary } from "../services/aiService";

export default function AITools() {
  const { subjects, topics } = useStudy();
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    const topic = input.trim();
    if (!topic) return;

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const result = await generateSummary(topic);
      setSummary(result);
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const allTopics = topics.map((t) => t.name);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-3xl font-bold mb-2">AI Tools</h1>
      <p className="text-gray-400 mb-6">
        Generate concise study summaries on any topic using AI.
      </p>

      <div className="bg-[#1e293b] p-6 rounded-2xl shadow max-w-2xl mb-6">
        <h2 className="text-xl font-semibold mb-4">Generate Summary</h2>

        <input
          type="text"
          placeholder="Enter a topic (e.g. Photosynthesis, Binary Search, etc.)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleGenerate();
          }}
          className="w-full p-3 mb-4 rounded-lg bg-[#0f172a] border border-gray-700 focus:outline-none"
        />

        {allTopics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {allTopics.map((t, i) => (
              <button
                key={i}
                onClick={() => setInput(t)}
                className="text-xs bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full hover:bg-indigo-600/40 transition"
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading || !input.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2 rounded-lg transition"
        >
          {loading ? "Generating..." : "Generate Summary"}
        </button>
      </div>

      {error && (
        <div className="bg-red-900/40 border border-red-700 text-red-300 p-4 rounded-xl max-w-2xl mb-6">
          {error}
        </div>
      )}

      {summary && (
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow max-w-2xl">
          <h2 className="text-xl font-semibold mb-3">Summary</h2>
          <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {summary}
          </div>
        </div>
      )}
    </div>
  );
}
