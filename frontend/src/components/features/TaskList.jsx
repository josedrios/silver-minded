export function TaskList() {
  return (
    <div id="task-list">
      <div id="task-header" className="task-row">
        <span className="task-name">Name</span>
        <span className="task-info">Task</span>
        <span className="task-tag">Tag</span>
        <span className="task-status">Status</span>
      </div>
      <TaskRow />
    </div>
  );
}

function TaskRow() {
  return (
    <div className="task-row">
      <span className="task-name">Comment</span>
      <div className="task-info-container">
        <span
          className="task-info"
          title="Branch subcomments off parent comments and add those lines"
        >
          Branch subcomments off parent comments and add those lines
        </span>
      </div>{" "}
      <span className="task-tag">/root</span>
      <span className="task-status">PENDING</span>
    </div>
  );
}

export function TaskCreation() {
  return (
    <div id="task-creation">
      <span>/task &gt;</span>
      <input id="task-creation-input" type="text" />
    </div>
  );
}
