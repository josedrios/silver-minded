import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import {
  CalendarView,
  CalendarList,
  fetchEvents,
} from '../features/events';
import { CreateEvent } from '../features/events';
import { Modal } from '../components';

export default function Time() {
  const { events, setEvents } = useContext(AppContext);
  const [eventModal, setEventModal] = useState(false);

  useEffect(() => {
    const fetchAndUpdateEvents = async () => {
      const { start, end } = events.view.frame;
      const fetchedEvents = await fetchEvents(start, end);
  
      setEvents((prev) => ({
        ...prev,
        view: {
          ...prev.view,
          events: fetchedEvents, 
        },
      }));
    };
  
    fetchAndUpdateEvents();
  }, [events.view.frame.start, events.view.frame.end]);

  return (
    <div id="time-container">
      <CalendarView events={events.view.events}/>
      <CalendarList />
      <Modal isOpen={eventModal} onClose={() => setEventModal(false)}>
        <CreateEvent />
      </Modal>
      <button onClick={() => setEventModal(true)}>open</button>
    </div>
  );
}
