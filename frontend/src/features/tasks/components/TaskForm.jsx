import { useEffect, useState } from 'react';
import TextField from '../../../components/form/TextFields';
import Button from '../../../components/UI/Buttons';
import { PlusIcon } from '../../../components/UI/Icons';
import { createTask, editTask } from '../services/taskService';

export default function TaskForm({
  tasks,
  loadTasks,
  selectedTask,
  setSelectedTask,
  taskInputRef
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

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <TextField
        beforeText={selectedTask ? 'EDIT/' : 'CREATE/'}
        placeholder="TASK"
        value={taskInfo}
        onChange={(e) => setTaskInfo(e.target.value)}
        ref={taskInputRef}
      />
      <Button squared={true} type="submit">
        <PlusIcon />
      </Button>
    </form>
  );
}
