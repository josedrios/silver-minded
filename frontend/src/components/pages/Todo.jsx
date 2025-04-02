import { TaskList } from "../features/TaskList";
import {
  TerminalContainer,
  SubTerminalContainer,
} from "../layout/TerminalContainer";

export default function Todo() {
  return (
    <TerminalContainer
      id="todo-container"
      classname="full-terminal-container"
      color="red"
      labels={["Categories", "Heatmap"]}
      controllers={["filter", "sort", "stat","kill"]}
      divider={[1, 3]}
    >
      <div id="todo-header">
        <TaskProgressBars />
        <TaskOverview />
        <TaskHeatMap />
      </div>

      <SubTerminalContainer
        classname="todo-sub"
        color="red"
        labels={["Task", "42"]}
        divider={[2]}
      >
        <TaskList />
      </SubTerminalContainer>
    </TerminalContainer>
  );
}

function TaskProgressBars() {
  return (
    <div className="cat-progress-bar-container">
      <CatProgressBar color="rgb(34, 156, 34)" label="Done" />
      <CatProgressBar color="rgb(34, 156, 34)" label="New" />
      <CatProgressBar color="rgb(183, 181, 79)" label="Old" />
      <CatProgressBar color="rgb(125, 15, 184)" label="Urg" />
    </div>
  );
}

function CatProgressBar({ color, label }) {
  const rgb = color.match(/\d+/g).join(",");
  const boxes = Array.from({ length: 10 });
  return (
    <div className="cat-progress-bar">
      <p className="cat-progress-label">
        {label}
        <span>(24)</span>
      </p>
      <div className="cat-progress-units-container">
        {boxes.map((_, i) => (
          <div
            key={i}
            className="cat-progress-unit"
            style={{
              backgroundColor: `rgba(${rgb}, ${0.55 + i * 0.05})`,
            }}
          />
        ))}
      </div>
      <p className="cat-progress-percentage">100%</p>
    </div>
  );
}

function TaskOverview() {
  return (
    <div id="task-overview">
      <div className="task-overview-row hold">
        <span className="task-overview-label">HOLD</span> <span>2</span>
      </div>
      <div className="task-overview-row pending">
        <span className="task-overview-label">PENDING</span> <span>3</span>
      </div>
      <div className="task-overview-row active">
        <span className="task-overview-label">ACTIVE</span> <span>2</span>
      </div>
      <div className="task-overview-row done">
        <span className="task-overview-label">DONE</span> <span>5</span>
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
