import { TerminalContainer, SubTerminalContainer } from "../layout/TerminalContainer";

export default function Todo() {
  return (
    <TerminalContainer
      id="todo-container"
      classname="full-terminal-container"
      color="red"
      labels={["42",'cats', "completions"]}
      controllers={["note", "complete", "edit", "kill"]}
      divider={[2, 3]}
    >
      <TaskList />
      
      <SubTerminalContainer
      classname="todo-sub"
      color="red"
      labels={["Name",'Task', "Tag", 'Status']}
      divider={[2]}
      >
        Test
      </SubTerminalContainer>
    </TerminalContainer>
  );
}

function TaskList() {
  return <div className="tasklist"></div>;
}
