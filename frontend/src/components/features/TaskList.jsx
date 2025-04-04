import { useState, useEffect, useRef } from "react";
import { createTask, editTask } from "../../util/taskUtil";

export function TaskList({
  tasks,
  selectedTask,
  setSelectedTask,
  changeTaskStatus,
}) {
  return (
    <div id="task-list">
      <div id="task-header" className="task-row">
        <span className="task-name">Name</span>
        <span className="task-info">Task</span>
        <span className="task-tag">Tag</span>
        <span className="task-status">Status</span>
      </div>
      {!Array.isArray(tasks) || tasks.length === 0 ? (
        <div>no tasks yet...</div>
      ) : (
        tasks.map((task, key) => (
          <TaskRow
            key={key}
            task={task}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            changeTaskStatus={changeTaskStatus}
          />
        ))
      )}
    </div>
  );
}

function TaskRow({ task, setSelectedTask, selectedTask, changeTaskStatus }) {
  const statusColors = {
    pending: "rgb(228, 153, 48)",  
    active: "rgb(38, 181, 38)",   
    done: "rgb(128, 128, 128)",   
  };

  return (
    <div
      className="task-row"
      onClick={() => {
        if (selectedTask === task) {
          setSelectedTask("");
        } else {
          setSelectedTask(task);
        }
      }}
      style={{
        backgroundColor: selectedTask === task ? "blue" : "transparent",
      }}
    >
      <span className="task-name">{task.name}</span>
      <div className="task-info-container">
        <span className="task-info" title={task.info}>
          {task.info}{" "}
        </span>
      </div>{" "}
      <span className="task-tag">/{task.tag}</span>
      <span className="task-status">
        {selectedTask === task ? (
          <div className="status-change-container">
            <button className="status-change-btn" onClick={() => changeTaskStatus('pending')}>P</button>
            <button className="status-change-btn" onClick={() => changeTaskStatus('active')}>A</button>
            <button className="status-change-btn" onClick={() => changeTaskStatus('done')}>D</button>
          </div>
        ):(
          <span
          style={{color: statusColors[task.status]}}
          >{task.status.toUpperCase()}</span>
        )}
      </span>
    </div>
  );
}