import { editTaskStatus } from "../../util/taskUtil";
import { FaCode, FaCheck } from "react-icons/fa6";
import { RiRobot2Line } from "react-icons/ri";

export function TaskList({ tasks, selectedTask, setSelectedTask, setTasks }) {
  const doneTasks = tasks.filter((task) => task.status === "done").length
  const donePercentage = tasks.length
  ? ((doneTasks / tasks.length) * 100).toFixed(0)
  : "0";
  const pendingTasks = tasks.filter((task) => task.status === "pending").length

  return (
    <div id="task-list">
      <div id="task-header" className="task-row">
        <span className="task-status">
          /task{" "}
          <span id="task-header-count">
            [
            {tasks
              ? doneTasks
              : "0"}
            /{tasks ? tasks.length : "0"}]
          </span>
        </span>
      </div>
      {!Array.isArray(tasks) || tasks.length === 0 ? (
        <div id="no-tasks-list">...</div>
      ) : (
        tasks.map((task, i) => (
          <TaskRow
            key={task._id}
            task={task}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            setTasks={setTasks}
            count={i + 1}
          />
        ))
      )}
      <div id="task-list-footer">
        <p>
          <span className="task-footer-done-span">{donePercentage}%</span> of tasks complete.
        </p>
        <p>
          <span className="task-footer-done-span">
            {doneTasks}
          </span>{" "}
          done ·{" "}
          <span className="task-footer-pending-span">
            {pendingTasks}
          </span>{" "}
          pending
        </p>
      </div>
    </div>
  );
}

function TaskRow({ task, setSelectedTask, selectedTask, setTasks, count }) {
  return (
    <div
      className={` task-row non-header ${
        selectedTask === task ? "selected-task" : ""
      }`}
      onClick={() => {
        if (selectedTask === task) {
          setSelectedTask("");
        } else {
          setSelectedTask(task);
        }
      }}
    >
      <span className="task-count-number">{count}.</span>
      <span className="task-status non-header">
        <button
          className={`ts-hover task-status-button ${
            task.status === "done" ? "done-status-btn" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();

            const statusOrder = ["pending", "done"];
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
        >
          {task.status === "pending" ? (
            "-"
          ) : task.status === "done" ? (
            <FaCheck />
          ) : (
            ""
          )}
        </button>
      </span>
      <span className="task-info" title={task.info}>
        {task.info}{" "}
      </span>
      <span className={`task-tag non-header-tag ${task.tag}`}>
        {task.tag === "dev" ? (
          <FaCode />
        ) : (
          <RiRobot2Line />
        )}
      </span>
    </div>
  );
}
