import { AppContext } from '../context/AppContext';
import { fetchTasks, TaskForm, TaskList } from '../features/tasks';
import { useState, useRef, useContext, useEffect } from 'react';

export default function Dash() {
  const { tasks, setTasks } = useContext(AppContext);
  const [listChanges, setListChanges] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const taskInputRef = useRef(null);

  const getUpdatedList = () => {
    let updatedList = tasks;

    if (listChanges === 'pendingTasks') {
      updatedList = tasks.filter((task) => task.status === 'pending');
    } else if (listChanges === 'doneTasks') {
      updatedList = tasks.filter((task) => task.status === 'done');
    } else if (listChanges === 'oldest') {
      updatedList = [...tasks].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (listChanges === 'status') {
      updatedList = [...tasks].sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return 0;
      });
    }

    return updatedList;
  };

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div id="dash-container">
      <div className="task-section">
        <TaskForm
          tasks={tasks}
          loadTasks={loadTasks}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          taskInputRef={taskInputRef}
        />
        <TaskList
          tasks={getUpdatedList()}
          setTasks={setTasks}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          taskInputRef={taskInputRef}
          listChanges={listChanges}
          setListChanges={setListChanges}
        />
      </div>
    </div>
  );
}
