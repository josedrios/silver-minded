import { AppContext } from '../context/AppContext';
import { TaskForm, TaskList } from '../features/tasks';
import { useContext, useEffect } from 'react';
import { fetchTasks } from '../features/tasks/services/taskService';

export default function Dash() {
  const { tasks, setTasks } = useContext(AppContext);

    const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
    console.log('FETCHED TASKS: ', data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div id="dash-container">
      <div className="task-section">
        <TaskForm loadTasks={loadTasks}/>
        <TaskList loadTasks={loadTasks} tasks={tasks} />
      </div>
    </div>
  );
}
