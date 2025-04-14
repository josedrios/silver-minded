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
          timeRange: event.timeRage,
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

export async function editEvent(id, event) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/event/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          info: event.info,
          reoccurring: event.reoccurring,
          timeRange: event.timeRange,
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

export async function fetchEvents(month) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/event/${month}`,
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
