import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { CalendarView, fetchEvents } from '../features/events';
import { CreateEvent } from '../features/events';
import { Modal } from '../components';

export default function Time() {
  const { events, setEvents } = useContext(AppContext);
  const [eventModal, setEventModal] = useState(false);

  useEffect(() => {
    const fetchAndUpdateEvents = async () => {
      const fetchedEvents = await fetchEvents(events.year, events.month);

      setEvents((prev) => ({
        ...prev,
        events: fetchedEvents,
      }));
    };

    fetchAndUpdateEvents();
  }, [events.month]);

  return (
    <div id="time-container">
      <CalendarView events={events} setEvents={setEvents} />
      <Modal isOpen={eventModal} onClose={() => setEventModal(false)}>
        <CreateEvent events={events} setEvents={setEvents} />
      </Modal>
      <button onClick={() => setEventModal(true)}>open</button>
    </div>
  );
}
