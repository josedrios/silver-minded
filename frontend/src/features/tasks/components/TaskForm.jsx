import { useEffect, useState } from 'react';
import { createTask, editTask, removeTask } from '../services/taskService';
import {
  TextField,
  Button,
  PlusIcon,
  TrashIcon,
  PenIcon
} from '../../../components';

export default function TaskForm({
  tasks,
  loadTasks,
  selectedTask,
  setSelectedTask,
  taskInputRef,
}) {
  const [taskInfo, setTaskInfo] = useState('');

  useEffect(() => {
    if (selectedTask !== '') {
      const task = tasks.find((task) => task._id === selectedTask);
      if (task) {
        setTaskInfo(task.info);
      }
    } else {
      setTaskInfo('');
    }
  }, [selectedTask, tasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedTask) {
      await editTask(selectedTask, taskInfo, null);
    } else {
      await createTask(taskInfo);
    }
    setSelectedTask('');
    setTaskInfo('');
    loadTasks();
  };

  const handleDelete = async (id) => {
    await removeTask(id);
    setSelectedTask('');
    setTaskInfo('');
    loadTasks();
  };

  return (
    <form className="task-form selected-task-safe" onSubmit={handleSubmit}>
      <TextField
        beforeText={selectedTask ? 'EDIT/' : 'CREATE/'}
        placeholder="TASK"
        value={taskInfo}
        onChange={(e) => setTaskInfo(e.target.value)}
        ref={taskInputRef}
        variant="gray"
      />
      {selectedTask !== '' ? (
        <Button
          onClick={() => handleDelete(selectedTask)}
          variant="error"
          squared={true}
          type="button"
        >
          <TrashIcon />
        </Button>
      ) : (
        ''
      )}
      <Button squared={true} type="submit">
        {selectedTask === '' ? <PlusIcon /> : <PenIcon />}
      </Button>
    </form>
  );
}
