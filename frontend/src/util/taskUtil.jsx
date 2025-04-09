export async function createTask(task) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ info: task.info, tag: task.tag }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to create task");
    return;
  } catch (err) {
    console.error("Create Task Error:", err.message);
    return;
  }
}

export async function editTask(id, task) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ info: task.info, tag: task.tag }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to edit task");
    return;
  } catch (err) {
    console.error("Edit Task Error:", err.message);
    return;
  }
}

export async function editTaskStatus(id, status) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/status/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to update task status");
    return;
  } catch (err) {
    console.error("Update Status Error:", err.message);
    return;
  }
}

export async function removeTask(id) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to delete task");
    return;
  } catch (err) {
    console.error("Delete Task Error:", err.message);
    return;
  }
}

export async function removeDoneTasks() {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/done`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to delete done tasks");
    return;
  } catch (err) {
    console.error("Delete Done Tasks Error:", err.message);
    return;
  }
}

export async function fetchTasks() {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch tasks");
    return data;
  } catch (err) {
    console.error("Fetch Tasks Error:", err.message);
    return;
  }
}
