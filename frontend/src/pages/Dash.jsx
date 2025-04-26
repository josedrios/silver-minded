import { AppContext } from "../context/AppContext";
import { TaskForm, TaskList } from "../features/tasks"
import { useContext } from "react";

export default function Dash() {
    const { tasks, setTasks } = useContext(AppContext);

    return (
        <>
            <TaskForm />
            <TaskList />
        </>
    )
}