import { fetchTasks, removeDoneTasks, removeTask } from "../../util/taskUtil";
import TodoForm from "../features/TodoForm";
import { TaskList } from "../features/TaskList";
import { useState, useEffect,useContext } from "react";
import { FaCode, FaCheck } from "react-icons/fa6";
import { RiRobot2Line } from "react-icons/ri";
import { TbCheckbox } from "react-icons/tb";
import { IoIosTimer } from "react-icons/io";
import { GoSortAsc, GoAlertFill } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { AppContext } from "../../util/AppContext";

export default function Todo() {
  const { tasks, setTasks } = useContext(AppContext);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filters, setFilters] = useState({
    tags: [],
    status: [],
  });
  const [sortType, setSortType] = useState("");

  const statusPriority = {
    pending: 0,
    done: 1,
  };

  useEffect(() => {
    const safeTasks = tasks || [];
    let temp = safeTasks.filter((task) => {
      const tagMatches =
        filters.tags.length === 0 || filters.tags.includes(task.tag);
      const statusMatches =
        filters.status.length === 0 || filters.status.includes(task.status);
      return tagMatches && statusMatches;
    });

    if (sortType === "prio-desc") {
      temp.sort((a, b) => statusPriority[a.status] - statusPriority[b.status]); // descending priority
    } else if (sortType === "created-asc") {
      temp.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); //ascending creation
    } else if (sortType === "due-asc") {
      const withDue = temp.filter((task) => task.dueAt); // ascending due date
      const withoutDue = temp.filter((task) => !task.dueAt);
      withDue.sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt));
      temp = [...withDue, ...withoutDue];
    } else {
      temp.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // descending creation (default)
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

  const killDoneTask = async () => {
    await removeDoneTasks();
    await loadTasks();
    setSelectedTask("");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedTask = e.target.closest(".task-row");
      const keepSelected = e.target.closest(".keep-selected-state");
  
      if (!clickedTask && !keepSelected) {
        setSelectedTask("");
      }
    };
  
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div id="todo-container" className="main-container">
      <div id="todo-dashboard">
        <TodoForm
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          onTaskCreated={loadTasks}
          killTask={killTask}
        />
        <div id="todo-dashboard-settings">
          <TodoFilter
            filters={filters}
            setFilters={setFilters}
            sortType={sortType}
            setSortType={setSortType}
            killDoneTask={killDoneTask}
          />
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

function TodoFilter({
  filters,
  setFilters,
  sortType,
  setSortType,
  killDoneTask,
}) {
  return (
    <div id="todo-dashboard-filters">
      <div className="filter-button-container">
        <TodoFilterSection
          type={"tags"}
          items={[
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
            { name: "Done", icon: FaCheck },
          ]}
          filters={filters}
          setFilters={setFilters}
          sortType={sortType}
          setSortType={setSortType}
          killDoneTask={killDoneTask}
        />
      </div>
    </div>
  );
}

function TodoFilterSection({
  type,
  items,
  filters,
  setFilters,
  sortType,
  setSortType,
  killDoneTask,
}) {
  const toggleFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  return (
    <>
      {" "}
      {items.map(({ name, icon: Icon }, index) => (
        <button
          key={index}
          className={` filter-button ${name.toLowerCase()} ${
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
      {type == "status" ? (
        <>
          <button
            className={` filter-button ${
              sortType === "prio-desc" ? "selected-sort" : ""
            }`}
            onClick={() => {
              if (sortType === "prio-desc") {
                setSortType("");
              } else {
                setSortType("prio-desc");
              }
            }}
            title="Descending Status"
          >
            <TbCheckbox /> Status
          </button>
          <button
            className={` filter-button ${
              sortType === "created-asc" ? "selected-sort" : ""
            }`}
            onClick={() => {
              if (sortType === "created-asc") {
                setSortType("");
              } else {
                setSortType("created-asc");
              }
            }}
            title="Ascending Creation"
          >
            <GoSortAsc /> Time
          </button>
          <button
            className={` filter-button ${
              sortType === "due-asc" ? "selected-sort" : ""
            }`}
            onClick={() => {
              if (sortType === "due-asc") {
                setSortType("");
              } else {
                setSortType("due-asc");
              }
            }}
            title="Ascending Due Date"
          >
            <GoAlertFill /> Priority
          </button>
          <button id="delete-done-tasks-btn" onClick={() => killDoneTask()}>
            Done Tasks <FaRegTrashAlt />
          </button>
        </>
      ) : (
        ""
      )}
    </>
  );
}
