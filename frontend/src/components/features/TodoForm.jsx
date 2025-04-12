import { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { RiRobot2Line } from "react-icons/ri";
import { createTask, editTask } from "../../util/taskUtil";

export default function TodoForm({
  selectedTask,
  setSelectedTask,
  onTaskCreated,
  killTask,
}) {
  const [taskForm, setTaskForm] = useState({
    info: "",
    tag: "",
  });

  useEffect(() => {
    if (selectedTask) {
      setTaskForm({
        info: selectedTask.info,
        tag: selectedTask.tag,
      });
    } else {
      setTaskForm({ info: "", tag: "" });
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitTask = async () => {
    const updatedForm = {
      ...taskForm,
      tag: taskForm.tag === "" ? "misc" : taskForm.tag,
    };

    if (selectedTask) {
      await editTask(selectedTask._id, updatedForm);
      setSelectedTask("");
    } else {
      await createTask(updatedForm);
    }
    onTaskCreated();
    setTaskForm({ info: "", tag: "" });
  };

  return (
    <form
      id="todo-form"
      onSubmit={(e) => {
        e.preventDefault();
        submitTask();
      }}
    >
      <input
        name="info"
        type="text"
        value={taskForm.info}
        onChange={handleChange}
        className="keep-selected-state todo-info-input standard-input"
        placeholder="Enter task ..."
        autoComplete="off"
      />
      <div className="todo-form-row">
        <div id="task-tag-editor">
          <button
            type="button"
            className={`keep-selected-state dev ${taskForm.tag === "dev" ? "selected" : ""}`}
            onClick={() => {
              if (taskForm.tag === "dev") {
                setTaskForm((prev) => ({
                  ...prev,
                  tag: "",
                }));
              } else {
                setTaskForm((prev) => ({
                  ...prev,
                  tag: "dev",
                }));
              }
            }}
          >
            <FaCode />
          </button>
          <button
            type="button"
            className={`misc keep-selected-state ${
              taskForm.tag && taskForm.tag !== "root" && taskForm.tag !== "dev"
                ? "selected"
                : ""
            }`}
            onClick={() => {
              if (taskForm.tag === "misc") {
                setTaskForm((prev) => ({
                  ...prev,
                  tag: "",
                }));
              } else {
                setTaskForm((prev) => ({
                  ...prev,
                  tag: "misc",
                }));
              }
            }}
          >
            {" "}
            <RiRobot2Line />
          </button>
        </div>
        <button
          style={{ display: selectedTask ? "" : "none" }}
          type="button"
          className="keep-selected-state delete-task-icon"
          onClick={() => {
            if (selectedTask) killTask();
          }}
        >
          {" "}
          <FaRegTrashAlt />
        </button>
        <button type="submit" className="keep-selected-state todo-form-submit standard-btn">
          {selectedTask ? "Edit" : "Create"}
        </button>
      </div>
    </form>
  );
}
