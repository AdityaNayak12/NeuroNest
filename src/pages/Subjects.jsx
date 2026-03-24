import { useState } from "react";
import { useStudy } from "../context/StudyContext";

function Subjects() {
    const { subjects, addSubject } = useStudy();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");


    const handleAdd = (e) => {
        e.preventDefault();
        if (!name) return;

        addSubject({ name, description });

        setName("");
        setDescription("");
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Subjects</h1>

            <form
                onSubmit={handleAdd}
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

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                    subjects.map((sub) => (
                        <div
                            key={sub.id}
                            className="bg-[#1e293b] p-4 rounded-xl shadow"
                        >
                            <h3 className="text-lg font-semibold">{sub.name}</h3>
                            <p className="text-gray-400 text-sm mt-1">
                                {sub.description || "No description"}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Subjects;
