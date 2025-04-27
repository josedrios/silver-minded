import { AppContext } from '../context/AppContext';
import { TaskForm, TaskList } from '../features/tasks';
import { useState, useRef, useContext, useEffect } from 'react';
import { fetchTasks } from '../features/tasks/services/taskService';

export default function Dash() {
  const { tasks, setTasks } = useContext(AppContext);
  const [selectedTask, setSelectedTask] = useState('');
  const taskInputRef = useRef(null);


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
          tasks={tasks}
          setTasks={setTasks}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          taskInputRef={taskInputRef}
        />
      </div>
    </div>
  );
}
