export async function createEvent(event) {
    try {
        console.log('CHECKPOINT: eventService.jsx');
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/event/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: event }),
        });
    
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to create event");
        return;
      } catch (err) {
        console.error("Create Event Error:", err.message);
        return;
      }
}