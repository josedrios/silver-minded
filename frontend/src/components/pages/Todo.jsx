import { editTaskStatus, fetchTasks, removeTask } from "../../util/taskUtil";
import { TaskList } from "../features/TaskList";
import {
  TerminalContainer,
  SubTerminalContainer,
} from "../layout/TerminalContainer";
import { useState, useEffect } from "react";

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
  };

  const changeTaskStatus = async (status) => {
    if (selectedTask) {
      await editTaskStatus(selectedTask._id, status);
      await loadTasks();
    }
  };

  return (
    <TerminalContainer
      id="todo-container"
      classname="full-terminal-container"
      color="red"
      labels={["Categories", "Heatmap"]}
      controllers={[{ name: "kill", function: killTask }]}
      divider={[1, 3]}
    >
      <div id="todo-header">
        <TaskProgressBars tasks={tasks}/>
        <TaskOverview tasks={tasks}/>
        <TaskHeatMap />
      </div>

      <SubTerminalContainer
        classname="todo-sub"
        color="red"
        labels={["Task", "42"]}
        divider={[2]}
      >
        <TaskList
          loadTasks={loadTasks}
          tasks={tasks}
          setTasks={setTasks}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          changeTaskStatus={changeTaskStatus}
        />
      </SubTerminalContainer>
    </TerminalContainer>
  );
}

function TaskProgressBars({tasks}) {
  return (
    <div className="cat-progress-bar-container">
      <CatProgressBar color="rgb(34, 156, 34)" label="new" tasks={tasks}/>
      <CatProgressBar color="rgb(183, 181, 79)" label="old" tasks={tasks}/>
      <CatProgressBar color="rgb(125, 15, 184)" label="due" tasks={tasks}/>
    </div>
  );
}

function CatProgressBar({ color, label, tasks }) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return <div id="task-overview">NONE</div>;
  }
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // midnight today
  
  const categoryCounts = tasks.reduce(
    (acc, task) => {
      const createdAt = new Date(task.createdAt);
      const dueAtExists = !!task.dueAt;
  
      if (dueAtExists) acc.due += 1;
      else if (createdAt >= today) acc.new += 1;
      else acc.old += 1;
  
      return acc;
    },
    { new: 0, old: 0, due: 0 }
  );

  const rgb = color.match(/\d+/g).join(",");
  const boxes = Array.from({ length: 10 });
  const percentage = ((categoryCounts[label] / tasks.length) * 100).toFixed(0);

  return (
    <div className="cat-progress-bar">
      <p className="cat-progress-label">
        {label.toUpperCase()}
        <span>({categoryCounts[label]})</span>
      </p>
      <div className="cat-progress-units-container">
        {boxes.map((_, i) =>{
          const fill = (i*10) > percentage;
           return (
            <div
              key={i}
              className="cat-progress-unit"
              style={{
                backgroundColor: fill ? "" : `rgba(${rgb}, ${0.7 + i * 0.03})`,
              }}
            />
          )
        })}
      </div>
      <p className="cat-progress-percentage">{percentage}%</p>
    </div>
  );
}

function TaskOverview({tasks}) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return <div id="task-overview">NONE</div>;
  }
  
  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div id="task-overview">
      <div className="task-overview-row pending">
        <span className="task-overview-label">PENDING</span> <span>{!statusCounts['pending'] ? '0' : statusCounts['pending']}</span>
      </div>
      <div className="task-overview-row active">
        <span className="task-overview-label">ACTIVE</span> <span>{!statusCounts['active'] ? '0' : statusCounts['active']}</span>
      </div>
      <div className="task-overview-row done">
        <span className="task-overview-label">DONE</span> <span>{!statusCounts['done'] ? '0' : statusCounts['done']}</span>
      </div>
    </div>
  );
}

function TaskHeatMap() {
  const boxes = Array.from({ length: 200 });
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
