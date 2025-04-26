import Button from '../../../components/UI/Buttons';
import { FilterIcon } from '../../../components/UI/Icons';
import { motion, AnimatePresence } from 'motion/react';
import { editTask } from '../services/taskService';
import { useState } from 'react';

const list = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: -15 },
  visible: { opacity: 1, y: 0, transition: { type: 'tween', duration: 0.15 } },
};

export default function TaskList({ loadTasks, tasks }) {
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
          {tasks.map((task, i) => (
            <TaskItem
              task={task}
              key={task._id}
              isLast={i === tasks.length - 1}
              loadTasks={loadTasks}
            />
          ))}
        </motion.ol>
      </AnimatePresence>
    </div>
  );
}

function TaskItem({ task, isLast = false, items, loadTasks }) {
  const updateStatus = async (task) => {
    const updatedTask = {
      info: task.info,
      status: task.status === 'done' ? 'pending' : 'done',
    };

    try {
      await editTask(task._id, updatedTask);
      setCurrentStatus((prev) => (prev === 'done' ? 'pending' : 'done'));
    } catch (error) {
      console.error('Error while updating task status: ', error);
    }
  };

  const [currentStatus, setCurrentStatus] = useState(task.status);

  return (
    <motion.li
      className="task-item"
      variants={item}
      exit={{ opacity: 0, y: 20 }}
    >
      <span className={`tree-character ${isLast ? 'last' : ''}`}>
        {isLast ? '└' : '├'}
      </span>
      <button
        className={`status ${currentStatus}`}
        onClick={() => updateStatus(task)}
      >
        [{currentStatus.toUpperCase()}]
      </button>
      <span className="info">{task.info}</span>
    </motion.li>
  );
}
