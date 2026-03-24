import { createContext, useContext, useEffect, useState } from "react";

const StudyContext = createContext();


export const StudyProvider = ({children}) =>{
    const [subjects, setSubjects] = useState([]);
    const [topics, setTopics] = useState([]);
    const [tasks, setTasks] = useState([]);


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

    return (
        <StudyContext.Provider
        value={{
            subjects,
            topics,
            tasks,
            addSubject,
            addTask,
            addTopic,
            updateTaskStatus
        }}
        >
            {children}
        </StudyContext.Provider>
    );
};

export const useStudy = () => useContext(StudyContext);