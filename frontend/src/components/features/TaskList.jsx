import { useState, useEffect, useRef } from "react";

export function TaskList() {
  return (
    <div id="task-list">
      <div id="task-header" className="task-row">
        <span className="task-name">Name</span>
        <span className="task-info">Task</span>
        <span className="task-tag">Tag</span>
        <span className="task-status">Status</span>
      </div>
      <TaskRow />
    </div>
  );
}

function TaskRow() {
  return (
    <div className="task-row">
      <span className="task-name">Comment</span>
      <div className="task-info-container">
        <span
          className="task-info"
          title="Branch subcomments off parent comments and add those lines"
        >
          Branch subcomments off parent comments and add those lines
        </span>
      </div>{" "}
      <span className="task-tag">/root</span>
      <span className="task-status">PENDING</span>
    </div>
  );
}

export function TaskCreation() {
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
    } else {
      console.log('Task created')
      console.log(taskForm)
      setInputValue("");
      setCurrentInput("name")
    }
  }, [taskForm]);

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