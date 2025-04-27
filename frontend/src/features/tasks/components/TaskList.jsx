import Button from '../../../components/UI/Buttons';
import { FilterIcon } from '../../../components/UI/Icons';
import { motion, AnimatePresence } from 'motion/react';
import { editTask } from '../services/taskService';

const list = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: -15 },
  visible: { opacity: 1, y: 0, transition: { type: 'tween', duration: 0.1 } },
};

export default function TaskList({
  tasks,
  setTasks,
  selectedTask,
  setSelectedTask,
  taskInputRef,
}) {
  const doneCount = tasks.filter((task) => task.status === 'done').length;
  const pendingCount = tasks.filter((task) => task.status === 'pending').length;
  const completePercentage = ((doneCount / tasks.length) * 100).toFixed(0);

  const updateStatus = async (task) => {
    const updatedTasks = tasks.map((currTask) =>
      currTask._id === task._id
        ? {
            ...currTask,
            status: currTask.status === 'done' ? 'pending' : 'done',
          }
        : currTask
    );
    setTasks(updatedTasks);

    await editTask(task._id, null, task.status === 'done' ? 'pending' : 'done');
  };

  return (
    <div className="task-list">
      <div className="task-list-header">
        <p>/TASKS</p>
        <Button squared={true} variant="gray">
          <FilterIcon />
        </Button>
      </div>
      <AnimatePresence>
        <motion.ol
          initial="hidden"
          animate="visible"
          variants={list}
          className="task-list-body"
        >
          {tasks.length !== 0 ? (
            tasks.map((task, i) => (
              <TaskItem
                task={task}
                key={task._id}
                isLast={i === tasks.length - 1}
                updateStatus={updateStatus}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                taskInputRef={taskInputRef}
              />
            ))
          ) : <span className="no-task-message">
            NO TASKS
        </span>}
        </motion.ol>
      </AnimatePresence>
      <div className="task-list-footer" variants={item}>
        <span className="done-percentage">
          {!isNaN(completePercentage) ? completePercentage : '0'}%
        </span>{' '}
        of tasks complete
      </div>
    </div>
  );
}

function TaskItem({
  task,
  isLast = false,
  updateStatus,
  selectedTask,
  setSelectedTask,
  taskInputRef,
}) {
  return (
    <motion.li
      className={`task-item ${selectedTask === task._id ? 'selected' : ''}`}
      variants={item}
      exit={{ opacity: 0, y: 20 }}
      onClick={() => {
        if (selectedTask === task._id) {
          setSelectedTask('');
        } else {
          setSelectedTask(task._id);
          taskInputRef.current.focus();
        }
      }}
    >
      <span className={`tree-character ${isLast ? 'last' : ''}`}>
        {isLast ? '└' : '├'}
      </span>
      <button
        className={`status ${task.status}`}
        onClick={(e) => {
          e.stopPropagation();
          updateStatus(task);
        }}
      >
        [{task.status === 'done' ? 'DONE' : 'HOLD'}]
      </button>
      <span className="info">{task.info}</span>
    </motion.li>
  );
}
