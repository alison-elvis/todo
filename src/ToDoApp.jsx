import { useState, useEffect } from "react";

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  
  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask("");
    }
  };
  const handleDeleteTask = (taskID) => {
    const newTasks = tasks.filter((t) => t.id !== taskID);
    setTasks(newTasks);
  };
  
  const handleToggleComplete = (taskID) => {
    const newTasks = tasks.map((t) => t.id === taskID ? { ...t, completed: !t.completed } : t);
    setTasks(newTasks);
  };
  return (
    <div>
      <h1>ToDo Application</h1>
      <input 
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder={"Add a new task"}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <span style={{textDecoration: t.completed ? "line-through" : "none"}} onClick={() => handleToggleComplete(t.id)}>{t.text}</span>
            <button onClick={() => handleDeleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ToDoApp;