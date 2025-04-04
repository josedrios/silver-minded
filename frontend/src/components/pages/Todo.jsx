import { fetchTasks, createTask, editTask, editTaskStatus, removeTask } from "../../util/taskUtil";
import { TaskList } from "../features/TaskList";
import { useState, useEffect } from "react";
import { FaCode, FaCheck } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { TbPlant } from "react-icons/tb";
import { IoIosTimer } from "react-icons/io";
import { BsFillLightningFill } from "react-icons/bs";

export default function Todo() {
  const [selectedTask, setSelectedTask] = useState(null);

  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const killTask = async () => {
    if (selectedTask) {
      await removeTask(selectedTask._id);
      await loadTasks();
    }
    setSelectedTask("");
  };

  const changeTaskStatus = async (status) => {
    if (selectedTask) {
      await editTaskStatus(selectedTask._id, status);
      await loadTasks();
    }
  };

  return (
    <div id="todo-container">
      <div id="todo-dashboard">
        <TodoForm
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          onTaskCreated={loadTasks}
          killTask={killTask}
        />
        <div id="todo-dashboard-misc">
          {/* <TaskHeatMap /> */}
          <TodoFilter />
        </div>
      </div>
      <TaskList
        tasks={tasks}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
}

function TodoForm({ selectedTask, setSelectedTask, onTaskCreated, killTask }) {
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
    if (selectedTask) {
      await editTask(selectedTask._id, taskForm);
      setSelectedTask("");
    } else {
      await createTask(taskForm);
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
      />

      <input
        name="info"
        type="text"
        value={taskForm.info}
        onChange={handleChange}
        className="todo-info-input standard-input"
        placeholder="Info"
      />

      <input
        name="tag"
        type="text"
        value={taskForm.tag}
        onChange={handleChange}
        className="todo-info-tag standard-input"
        placeholder="Tag"
      />

      <button type="submit" className="todo-form-submit standard-btn">
        {selectedTask ? "Edit" : "Create"}
      </button>
    </form>
  );
}

function TaskHeatMap() {
  const boxes = Array.from({ length: 20 });
  const base = "46, 48, 171";
  const opacities = [0.3, 0.55, 0.8, 1.0];
  const colors = opacities.map((opacity) => `rgba(${base}, ${opacity})`);

  return (
    <div id="heatmap">
      {boxes.map((_, i) => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return (
          <div
            key={i}
            className="heatmap-unit"
            style={{ backgroundColor: randomColor }}
            title={i}
          />
        );
      })}
    </div>
  );
}

function TodoFilter() {
  return (
    <div id="todo-dashboard-filters">
      <p>Filters</p>
      <TodoFilterSection
        title={"Tag"}
        items={[
          { name: "root", icon: TbPlant },
          { name: "dev", icon: FaCode },
          { name: "misc", icon: RiRobot2Line },
        ]}
      />
      <TodoFilterSection
        title={"Status"}
        items={[
          { name: "Pending", icon: IoIosTimer },
          { name: "Active", icon: BsFillLightningFill },
          { name: "Done", icon: FaCheck },
        ]}
      />
    </div>
  );
}

function TodoFilterSection({ title, items }) {
  return (
    <>
      <div className="filter-button-container">
        {items.map(({ name, icon: Icon }, index) => (
          <button key={index} className={`filter-button ${name.toLowerCase()}`}>
            {Icon && <Icon className="filter-icon" />}
            <span>{name}</span>
          </button>
        ))}
      </div>
    </>
  );
}
