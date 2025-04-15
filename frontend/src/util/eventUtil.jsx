export async function createEvent(event) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/event/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          info: event.info,
          reoccurring: event.reoccurring,
          dueAt: event.dueAt,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to create event");
    return;
  } catch (err) {
    console.error("Create Event Error:", err.message);
    return;
  }
}

export async function editEvent(event, id) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/event/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          info: event.info,
          reoccurring: event.reoccurring,
          dueAt: event.dueAt
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to edit event");
    return;
  } catch (err) {
    console.error("Edit Event Error:", err.message);
    return;
  }
}

export async function fetchEvents(month, year) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/event/${year}/${month}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch events");
    return data;
  } catch (err) {
    console.error("Fetch Events Error:", err.message);
    return;
  }
}

export async function deleteEvent(id) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/event/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to delete event");
    return;
  } catch (err) {
    console.error("Edit Event Error:", err.message);
    return;
  }
}
