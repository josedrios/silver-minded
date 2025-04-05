import { useState, useEffect, useRef } from "react";
import { createTask, editTask, editTaskStatus } from "../../util/taskUtil";
import { FaCode } from "react-icons/fa6";
import { TbPlant } from "react-icons/tb";
import { RiRobot2Line } from "react-icons/ri";

export function TaskList({
  tasks,
  selectedTask,
  setSelectedTask,
  changeTaskStatus,
  loadTasks,
  setTasks
}) {
  return (
    <div id="task-list">
      <div id="task-header" className="task-row">
        <span className="task-tag">Tag</span>
        <span className="task-name">Name</span>
        <span className="task-info">Task</span>
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
            setTasks={setTasks}
          />
        ))
      )}
    </div>
  );
}

function TaskRow({
  task,
  setSelectedTask,
  selectedTask,
  setTasks
}) {
  const statusColors = {
    pending: "rgb(228, 153, 48)",
    active: "rgb(38, 181, 38)",
    done: "rgb(128, 128, 128)",
  };
  const statusOrder = ["pending", "active", "done"];

  return (
    <div
      className={`task-row ${selectedTask === task ? "selected-task" : ""}`}
      onClick={() => {
        if (selectedTask === task) {
          setSelectedTask("");
        } else {
          setSelectedTask(task);
        }
      }}
    >
      <span className={`task-tag non-header-tag ${task.tag}`}>
        {task.tag === "root" ? (
          <TbPlant />
        ) : task.tag === "dev" ? (
          <FaCode />
        ) : (
          <RiRobot2Line />
        )}
      </span>
      <span className="task-name">{task.name}</span>
      <div className="task-info-container">
        <span className="task-info" title={task.info}>
          {task.info}{" "}
        </span>
      </div>{" "}
      <span className="task-status">
        <button
          className="task-status-button"
          onClick={(e) => {
            e.stopPropagation();

            const statusOrder = ["pending", "active", "done"];
            const currentIndex = statusOrder.indexOf(task.status);
            const nextStatus =
              statusOrder[(currentIndex + 1) % statusOrder.length];

            editTaskStatus(task._id, nextStatus);

            setTasks((prevTasks) =>
              prevTasks.map((t) =>
                t._id === task._id ? { ...t, status: nextStatus } : t
              )
            );
          }}
          style={{ color: statusColors[task.status] }}
        >
          {task.status.toUpperCase()}
        </button>
      </span>
    </div>
  );
}
