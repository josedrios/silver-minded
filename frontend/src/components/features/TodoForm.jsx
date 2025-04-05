import { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { RiRobot2Line } from "react-icons/ri";
import { TbPlant } from "react-icons/tb";
import { createTask, editTask } from "../../util/taskUtil";

export default function TodoForm({ selectedTask, setSelectedTask, onTaskCreated, killTask }) {
  const [taskForm, setTaskForm] = useState({
    name: "",
    info: "",
    tag: "",
  });

  useEffect(() => {
    if (selectedTask) {
      setTaskForm({
        name: selectedTask.name,
        info: selectedTask.info,
        tag: selectedTask.tag,
      });
    } else {
      setTaskForm({ name: "", info: "", tag: "" });
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
    setTaskForm({ name: "", info: "", tag: "" });
  };

  return (
    <form
      id="todo-form"
      onSubmit={(e) => {
        e.preventDefault();
        submitTask();
      }}
    >
      <div id="todo-form-header">
        <p>{selectedTask ? "Edit" : "Create"} Task</p>
        <button
          type="button"
          className="delete-task-icon"
          onClick={() => {
            if (selectedTask) killTask();
          }}
        >
          {" "}
          <FaRegTrashAlt />
        </button>
      </div>

      <input
        name="name"
        type="text"
        value={taskForm.name}
        onChange={handleChange}
        className="todo-name-input standard-input"
        placeholder="Name"
        autoComplete="off"
      />

      <input
        name="info"
        type="text"
        value={taskForm.info}
        onChange={handleChange}
        className="todo-info-input standard-input"
        placeholder="Info"
        autoComplete="off"
      />
      <div id="task-tag-editor">
        <button
          type="button"
          className={`dev ${taskForm.tag === "dev" ? "selected" : ""}`}
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
          className={`root ${taskForm.tag === "root" ? "selected" : ""}`}
          onClick={() => {
            if (taskForm.tag === "root") {
              setTaskForm((prev) => ({
                ...prev,
                tag: "",
              }));
            } else {
              setTaskForm((prev) => ({
                ...prev,
                tag: "root",
              }));
            }
          }}
        >
          {" "}
          <TbPlant />
        </button>
        <button
          type="button"
          className={`misc ${
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

      <button type="submit" className="todo-form-submit standard-btn">
        {selectedTask ? "Edit" : "Create"}
      </button>
    </form>
  );
}