import { useState } from "react";
import { useStudy } from "../context/StudyContext";

function Subjects() {
  const { subjects, topics, addSubject, addTopic } = useStudy();
  const [name, setName] = useState("");
  const [topicInputs, setTopicInputs] = useState({});

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addSubject({ name: name.trim() });
    setName("");
  };

  const handleAddTopic = (subjectId, subjectName) => {
    const value = topicInputs[subjectId]?.trim();
    if (!value) return;
    addTopic({ name: value, subjectId, subjectName });
    setTopicInputs((prev) => ({ ...prev, [subjectId]: "" }));
  };

  const getTopicsForSubject = (subjectId) =>
    topics.filter((t) => t.subjectId === subjectId);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">Subjects</h1>
        <p className="text-gray-400 mb-8">Organize your subjects and add topics under each.</p>

        <form
          onSubmit={handleAddSubject}
          className="bg-[#1e293b]/60 border border-gray-800/50 p-6 rounded-2xl mb-8 max-w-xl"
        >
          <h2 className="text-lg font-semibold mb-4">Add New Subject</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Subject name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 p-3 rounded-xl bg-[#0f172a] border border-gray-700 text-sm"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              Add
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.length === 0 ? (
            <p className="text-gray-500">No subjects yet — add one above.</p>
          ) : (
            subjects.map((sub, i) => {
              const subTopics = getTopicsForSubject(sub.id);
              return (
                <div
                  key={sub.id}
                  className="bg-[#1e293b]/60 border border-gray-800/50 p-5 rounded-2xl transition-transform duration-200 hover:scale-[1.02] animate-fade-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <h3 className="text-lg font-semibold mb-3 text-indigo-300">
                    {sub.name}
                  </h3>

                  {subTopics.length > 0 ? (
                    <ul className="space-y-1.5 mb-4">
                      {subTopics.map((t) => (
                        <li
                          key={t.id}
                          className="text-sm text-gray-300 bg-[#0f172a]/60 px-3 py-2 rounded-lg"
                        >
                          {t.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 text-sm mb-4">No topics yet</p>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add topic..."
                      value={topicInputs[sub.id] || ""}
                      onChange={(e) =>
                        setTopicInputs((prev) => ({
                          ...prev,
                          [sub.id]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTopic(sub.id, sub.name);
                        }
                      }}
                      className="flex-1 p-2 text-sm rounded-lg bg-[#0f172a] border border-gray-700"
                    />
                    <button
                      onClick={() => handleAddTopic(sub.id, sub.name)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-sm px-3 py-1 rounded-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Subjects;
