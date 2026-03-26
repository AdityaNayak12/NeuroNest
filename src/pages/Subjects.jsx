import { useState } from "react";
import { useStudy } from "../context/StudyContext";

function Subjects() {
    const { subjects, topics, addSubject, addTopic } = useStudy();
    const [name, setName] = useState("");
    const [topicInputs, setTopicInputs] = useState({}); // { subjectId: "input value" }

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
            <h1 className="text-3xl font-bold mb-6">Subjects</h1>

            <form
                onSubmit={handleAddSubject}
                className="bg-[#1e293b] p-6 rounded-2xl shadow mb-6 max-w-xl"
            >
                <h2 className="text-xl font-semibold mb-4">Add New Subject</h2>

                <input
                    type="text"
                    placeholder="Subject name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg bg-[#0f172a] border border-gray-700 focus:outline-none"
                />

                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
                >
                    Add Subject
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.length === 0 ? (
                    <p className="text-gray-400">No subjects yet</p>
                ) : (
                    subjects.map((sub) => {
                        const subTopics = getTopicsForSubject(sub.id);

                        return (
                            <div
                                key={sub.id}
                                className="bg-[#1e293b] p-4 rounded-xl shadow"
                            >
                                <h3 className="text-lg font-semibold mb-3">
                                    {sub.name}
                                </h3>

                                {/* Topics list */}
                                {subTopics.length > 0 && (
                                    <ul className="space-y-1 mb-3">
                                        {subTopics.map((t) => (
                                            <li
                                                key={t.id}
                                                className="text-sm text-gray-300 bg-[#0f172a] px-3 py-1.5 rounded-lg"
                                            >
                                                {t.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {subTopics.length === 0 && (
                                    <p className="text-gray-500 text-sm mb-3">
                                        No topics yet
                                    </p>
                                )}

                                {/* Add topic input */}
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
                                        className="flex-1 p-2 text-sm rounded-lg bg-[#0f172a] border border-gray-700 focus:outline-none"
                                    />
                                    <button
                                        onClick={() =>
                                            handleAddTopic(sub.id, sub.name)
                                        }
                                        className="bg-indigo-600 hover:bg-indigo-700 text-sm px-3 py-1 rounded-lg transition"
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
    );
}

export default Subjects;
