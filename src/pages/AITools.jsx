import { useState } from "react";
import { useStudy } from "../context/StudyContext";
import { generateSummary } from "../services/aiService";

export default function AITools() {
  const { topics } = useStudy();
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
      setError(
        err.response?.data?.error?.message ||
          err.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const allTopics = topics.map((t) => t.name);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">AI Tools</h1>
        <p className="text-gray-400 mb-8">
          Generate concise study summaries on any topic using AI.
        </p>

        <div className="bg-[#1e293b]/60 border border-gray-800/50 p-6 rounded-2xl max-w-2xl mb-6">
          <h2 className="text-lg font-semibold mb-4">Generate Summary</h2>

          <input
            type="text"
            placeholder="Enter a topic (e.g. Photosynthesis, Binary Search, etc.)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGenerate();
            }}
            className="w-full p-3 mb-4 rounded-xl bg-[#0f172a] border border-gray-700 text-sm"
          />

          {allTopics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {allTopics.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setInput(t)}
                  className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-full hover:bg-indigo-500/20 transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed px-5 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Summary"
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl max-w-2xl mb-6 animate-fade-in">
            {error}
          </div>
        )}

        {summary && (
          <div className="bg-[#1e293b]/60 border border-gray-800/50 p-6 rounded-2xl max-w-2xl animate-fade-in">
            <h2 className="text-lg font-semibold mb-3">Summary</h2>
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
              {summary}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
