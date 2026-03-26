import { createContext, useContext, useEffect, useState } from "react";

const StudyContext = createContext();

const load = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const StudyProvider = ({children}) =>{
    const [subjects, setSubjects] = useState(() => load("subjects"));
    const [topics, setTopics] = useState(() => load("topics"));
    const [tasks, setTasks] = useState(() => load("tasks"));

    useEffect(() => localStorage.setItem("subjects", JSON.stringify(subjects)), [subjects]);
    useEffect(() => localStorage.setItem("topics", JSON.stringify(topics)), [topics]);
    useEffect(() => localStorage.setItem("tasks", JSON.stringify(tasks)), [tasks]);


    const addSubject = (subject) =>{
        setSubjects((prev) => [...prev, {id: Date.now(), ...subject}])
    };

    const addTopic = (topic) =>{
        setTopics((prev) => [...prev, {id: Date.now(), ...topic}])
    };

    const addTask = (task) => {
        setTasks((prev) => [
          ...prev,
          { id: Date.now(), status: "Pending", ...task },
        ]);
    };
    const updateTaskStatus = (id, status) => {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id ? { ...task, status } : task
          )
        );
    };

    const toggleRevision = (id) => {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id
              ? { ...task, needsRevision: !task.needsRevision }
              : task
          )
        );
    };

    return (
        <StudyContext.Provider
        value={{
            subjects,
            topics,
            tasks,
            addSubject,
            addTask,
            addTopic,
            updateTaskStatus,
            toggleRevision
        }}
        >
            {children}
        </StudyContext.Provider>
    );
};

export const useStudy = () => useContext(StudyContext);