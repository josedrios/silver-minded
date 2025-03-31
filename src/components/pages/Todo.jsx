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
      labels={["Categories", "Past"]}
      controllers={["note", "complete", "edit", "kill"]}
      divider={[1, 3]}
    >
      <div>
        <TaskProgressBars />
      </div>
      <SubTerminalContainer
        classname="todo-sub"
        color="red"
        labels={["Name", "Task", "Tag", "Status"]}
        divider={[2]}
      ></SubTerminalContainer>
    </TerminalContainer>
  );
}

function TaskProgressBars() {
  return (
    <div className="cat-progress-bar-container">
      <CatProgressBar color="rgb(34, 156, 34)" label="Done" />
      <CatProgressBar color="rgb(34, 156, 34)" label="New" />
      <CatProgressBar color="rgb(34, 156, 34)" label="Old" />
      <CatProgressBar color="rgb(34, 156, 34)" label="Urgent" />
    </div>
  );
}

function CatProgressBar({ color, label }) {
  const rgb = color.match(/\d+/g).join(",");
  const boxes = Array.from({ length: 10 });
  return (
    <div className="cat-progress-bar">
      <p className="cat-progress-label">{label}</p>
      <div className="cat-progress-units-container">
        {boxes.map((_, i) => (
          <div
            key={i}
            className="cat-progress-unit"
            style={{
                backgroundColor: `rgba(${rgb}, ${0.55 + i * 0.05})`
            }}
          />
        ))}
      </div>
      <p className="cat-progress-percentage">100%</p>
    </div>
  );
}
