import { convertToUTC, getStartEndDates } from '../';

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
    return data;
  } catch (err) {
    console.error('Create Event Error:', err.message);
    return;
  }
}

export async function fetchEvents(year, month) {
  try {
    const { start, end } = getStartEndDates(year, month);

    const startUTC = convertToUTC(start);
    const endUTC = convertToUTC(end);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/event/${startUTC}/${endUTC}`,
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

export async function editEvent(event, id) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/event/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: event }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to edit event');
    }

    return data;
  } catch (err) {
    console.error('Event Edit Error:', err.message);
    throw err;
  }
}

export async function deleteEvent(id) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/event/${id}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete event');
    }

    return data;
  } catch (err) {
    console.error('Event Deletion Error:', err.message);
    throw err;
  }
}
