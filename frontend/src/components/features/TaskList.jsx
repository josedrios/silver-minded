import { useState, useEffect, useRef } from "react";
import { createTask, fetchTasks } from "../../util/taskUtil";

export function TaskList() {
  const [tasks, setTasks] = useState(null);
  
  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div id="task-list">
      <TaskCreation onTaskCreated={loadTasks}/>
      <div id="task-header" className="task-row">
        <span className="task-name">Name</span>
        <span className="task-info">Task</span>
        <span className="task-tag">Tag</span>
        <span className="task-status">Status</span>
      </div>
      {tasks === null ? (
        <div>no tasks yet...</div>
      ) : (
        tasks.map((task, key) => (
          <TaskRow
            key={key}
            task={task}
          />
        ))
      )}
    </div>
  );
}

function TaskRow({task}) {
  return (
    <div className="task-row">
      <span className="task-name">{task.name}</span>
      <div className="task-info-container">
        <span className="task-info" title={task.info}>
          {task.info}{" "}
        </span>
      </div>{" "}
      <span className="task-tag">/{task.tag}</span>
      <span className="task-status">{task.status.toUpperCase()}</span>
    </div>
  );
}

export function TaskCreation({onTaskCreated}) {
  // Task object data
  const [taskForm, setTaskForm] = useState({
    name: "",
    info: "",
    tag: "",
  });
  // Holds current input text
  const [currentInput, setCurrentInput] = useState("name");
  // Holds the current input type (name, info, tag)
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  // Stay focused on input tag even after submission
  useEffect(() => {
    inputRef.current?.focus();
  }, [currentInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTaskForm((prev) => ({
      ...prev,
      [currentInput]: inputValue,
    }));
  };

  useEffect(() => {
    // Reset input when moving to the next
    if (taskForm.name === "") {
      setCurrentInput("name");
      setInputValue("");
    } else if (taskForm.info === "") {
      setCurrentInput("info");
      setInputValue("");
    } else if (taskForm.tag === "") {
      setCurrentInput("tag");
      setInputValue("");
    }
  }, [taskForm]);

  useEffect(() => {
    const allFieldsFilled = taskForm.name && taskForm.info && taskForm.tag;
    if (!allFieldsFilled) return;
  
    const submitTask = async () => {
      await createTask(taskForm);
      onTaskCreated();
      setTaskForm({ name: "", info: "", tag: "" });
      setInputValue("");
      setCurrentInput("name");
    };
  
    submitTask();
  }, [taskForm, onTaskCreated]);

  return (
    <div id="task-creation">
      <span>/task/{currentInput} &gt;</span>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="task-creation-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
    </div>
  );
}
