import { fetchTasks, removeTask } from "../../util/taskUtil";
import TodoForm from "../features/TodoForm";
import { TaskList } from "../features/TaskList";
import { useState, useEffect } from "react";
import { FaCode, FaCheck } from "react-icons/fa6";
import { RiRobot2Line } from "react-icons/ri";
import { TbPlant } from "react-icons/tb";
import { IoIosTimer } from "react-icons/io";
import { BsFillLightningFill } from "react-icons/bs";
import { GoSortAsc, GoSortDesc, GoAlertFill } from "react-icons/go";

export default function Todo() {
  const [selectedTask, setSelectedTask] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filters, setFilters] = useState({
    tags: [],
    status: [],
  });
  const [sortType, setSortType] = useState("");

  const statusPriority = {
    active: 0,
    pending: 1,
    done: 2,
  };

  useEffect(() => {
    let temp = tasks.filter((task) => {
      const tagMatches =
        filters.tags.length === 0 || filters.tags.includes(task.tag);
      const statusMatches =
        filters.status.length === 0 || filters.status.includes(task.status);
      return tagMatches && statusMatches;
    });

    if (sortType === "created-desc") {
      temp.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortType === "created-asc") {
      temp.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortType === "due-asc") {
      const withDue = temp.filter((task) => task.dueAt);
      const withoutDue = temp.filter((task) => !task.dueAt);
      withDue.sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt)); // closest first
      temp = [...withDue, ...withoutDue];
    } else {
      temp.sort((a, b) => statusPriority[a.status] - statusPriority[b.status]);
    }

    setFilteredTasks(temp);
  }, [tasks, filters, sortType]);

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
          <TodoFilter filters={filters} setFilters={setFilters} />
          <TodoSort sortType={sortType} setSortType={setSortType} />
        </div>
      </div>
      <TaskList
        tasks={filteredTasks}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        setTasks={setTasks}
      />
    </div>
  );
}

function TodoFilter({ filters, setFilters }) {
  return (
    <div id="todo-dashboard-filters">
      <p>Filters</p>
      <TodoFilterSection
        type={"tags"}
        items={[
          { name: "root", icon: TbPlant },
          { name: "dev", icon: FaCode },
          { name: "misc", icon: RiRobot2Line },
        ]}
        filters={filters}
        setFilters={setFilters}
      />
      <TodoFilterSection
        type={"status"}
        items={[
          { name: "Pending", icon: IoIosTimer },
          { name: "Active", icon: BsFillLightningFill },
          { name: "Done", icon: FaCheck },
        ]}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
}

function TodoFilterSection({ type, items, filters, setFilters }) {
  const toggleFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  return (
    <div className="filter-button-container">
      {items.map(({ name, icon: Icon }, index) => (
        <button
          key={index}
          className={`filter-button ${name.toLowerCase()} ${
            filters[type].includes(name.toLowerCase())
              ? "active-filter-btn"
              : ""
          }`}
          onClick={() => {
            toggleFilter(type, name.toLowerCase());
          }}
        >
          {Icon && <Icon className="filter-icon" />}
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
}

function TodoSort({ sortType, setSortType }) {
  return (
    <div id="todo-sort-container">
      <p id="todo-sort-title">Sorts</p>
      <div id="todo-sort-buttons-container">
        <button
          className={`todo-sort-btn ${
            sortType === "created-desc" ? "selected-sort" : ""
          }`}
          onClick={() => {
            if (sortType === "created-desc") {
              setSortType("");
            } else {
              setSortType("created-desc");
            }
          }}
        >
          <GoSortDesc />
        </button>
        <button
          className={`todo-sort-btn ${
            sortType === "created-asc" ? "selected-sort" : ""
          }`}
          onClick={() => {
            if (sortType === "created-asc") {
              setSortType("");
            } else {
              setSortType("created-asc");
            }
          }}
        >
          <GoSortAsc />
        </button>
        <button
          className={`todo-sort-btn ${
            sortType === "due-asc" ? "selected-sort" : ""
          }`}
          onClick={() => {
            if (sortType === "due-asc") {
              setSortType("");
            } else {
              setSortType("due-asc");
            }
          }}
        >
          <GoAlertFill />
        </button>
      </div>
    </div>
  );
}
