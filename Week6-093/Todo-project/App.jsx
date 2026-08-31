import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();

    if (task.trim() === "") {
      return;
    }

    setTasks([...tasks, task.trim()]);
    setTask("");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="app-shell">
      <div className="todo-card">
        <h2>ToDo App</h2>

        <form onSubmit={addTask} className="todo-form">
          <input
            type="text"
            value={task}
            placeholder="Enter a task"
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        <ul className="todo-list">
          {tasks.length === 0 ? (
            <li className="empty-item">No tasks yet</li>
          ) : (
            tasks.map((item, index) => (
              <li key={index} className="todo-item">
                <span>{item}</span>
                <button type="button" onClick={() => deleteTask(index)}>
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;