import {
  IconDropdown,
  FilterIcon,
  PauseIcon,
  CheckmarkIcon,
  HourglassIcon,
  DangerIcon,
  Button,
} from '../../../components';
import { useEffect } from 'react';
import { editTask, removeDoneTasks } from '../';
import { motion, AnimatePresence } from 'motion/react';

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
  listChanges,
  setListChanges,
  loadTasks,
}) {
  const doneCount = Array.isArray(tasks)
    ? tasks.filter((task) => task.status === 'done').length
    : 0;

  const pendingCount = Array.isArray(tasks)
    ? tasks.filter((task) => task.status === 'pending').length
    : 0;

  const completePercentage =
    doneCount + pendingCount > 0
      ? ((doneCount / (doneCount + pendingCount)) * 100).toFixed(0)
      : '0';

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

  const handleDropdownChange = (newValue) => {
    setListChanges(newValue);
  };

  const handleDocumentClick = (e) => {
    if (!e.target.closest('.selected-task-safe')) {
      setSelectedTask('');
    }
  };

  document.addEventListener('click', handleDocumentClick);

  useEffect(() => {
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className="task-list">
      <div className="task-list-header">
        <p>/TASKS</p>
        <IconDropdown
          icons={[
            FilterIcon,
            PauseIcon,
            CheckmarkIcon,
            HourglassIcon,
            DangerIcon,
          ]}
          options={['pendingTasks', 'doneTasks', 'oldest', 'status']}
          value={listChanges}
          variant={'gray'}
          onChange={handleDropdownChange}
        />
      </div>
      <AnimatePresence>
        <motion.ol
          initial="hidden"
          animate="visible"
          variants={list}
          className="task-list-body selected-task-safe"
        >
          {Array.isArray(tasks) && tasks.length !== 0 ? (
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
          ) : (
            <span className="empty-list-quote">No Tasks</span>
          )}
        </motion.ol>
      </AnimatePresence>
      <div className="task-list-footer" variants={item}>
        <div>
          <span className="done-percentage">
            {!isNaN(completePercentage) ? completePercentage : '0'}%
          </span>{' '}
          of tasks complete{' '}
          <span className="task-count">
            [{Array.isArray(tasks) && tasks.length !== 0 ? tasks.length : '?'}]
          </span>
        </div>
        <Button
          variant="error"
          className="delete-done-tasks"
          onClick={async () => {
            await removeDoneTasks();
            loadTasks();
          }}
        >
          DELETE DONE
        </Button>
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
      layout
      className={`task-item selected-task-safe ${
        selectedTask === task._id ? 'selected' : ''
      }`}
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
