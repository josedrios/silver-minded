import { useState } from 'react';
import TextField from '../../../components/form/TextFields';
import Button from '../../../components/UI/Buttons';
import { PlusIcon } from '../../../components/UI/Icons';
import { createTask } from '../services/taskService';

export default function TaskForm({ loadTasks }) {
  const [taskInfo, setTaskInfo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('tested');
    await createTask(taskInfo);
    setTaskInfo('');
    loadTasks();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <TextField
        beforeText="CREATE/"
        placeholder="TASK"
        value={taskInfo}
        onChange={(e) => setTaskInfo(e.target.value)}
      />
      <Button squared={true} type="submit">
        <PlusIcon />
      </Button>
    </form>
  );
}
