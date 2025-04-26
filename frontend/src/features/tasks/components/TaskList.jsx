import Button from '../../../components/UI/Buttons';
import { FilterIcon } from '../../../components/UI/Icons';

export default function TaskList({tasks}) {
  return (
    <div className="task-list">
      <div className="task-list-header">
        <p>/TASKS</p>
        <Button squared={true} variant="gray">
          <FilterIcon />
        </Button>
      </div>
      <div className="task-list-body">
        {tasks.map((task, i) => (
          <TaskItem task={task} key={i} isLast={i === (tasks.length-1)} />
        ))}
      </div>
    </div>
  );
}

function TaskItem({ task,isLast = false }) {
  return (
    <div className="task-item">
      <span className={`tree-character ${isLast ? 'last' : ''}`}>
        {isLast ? '└' : '├'}
      </span>
      <button className={`status ${task.status}`}>[{task.status === 'pending' ? 'WAIT' : task.status.toUpperCase()}]</button>
      <span className='info'>{task.info}</span>
    </div>
  );
}
