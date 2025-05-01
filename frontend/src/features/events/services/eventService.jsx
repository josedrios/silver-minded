export async function createEvent(event) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/event/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: event }),
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create event');
    return;
  } catch (err) {
    console.error('Create Event Error:', err.message);
    return;
  }
}

export async function fetchEvents(start, end) {
  try {
    if (!start || !end) {
      throw new Error('Invalid start or end date');
    }

    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/event/${start}/${end}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch events');
    }

    return data;
  } catch (err) {
    console.error('Fetch Events Error:', err.message); 
    throw err;  
  }
}

