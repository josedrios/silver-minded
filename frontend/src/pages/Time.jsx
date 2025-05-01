import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import {
  CalendarView,
  CalendarList,
  fetchEvents,
  formatDate,
} from '../features/events';
import { CreateEvent } from '../features/events';
import { Modal } from '../components';

export default function Time() {
  const { events, setEvents } = useContext(AppContext);
  const [eventModal, setEventModal] = useState(false);

  useEffect(() => {
    const { start, end } = events.view.frame;
    
    if (start && end) {
      const formattedStart = formatDate(start);
      const formattedEnd = formatDate(end);
  
      if (formattedStart && formattedEnd) {
        fetchEvents(formattedStart, formattedEnd);
      }
    } else {
      console.error('Invalid start or end date in events view frame.');
    }
  }, [events.view.frame.start, events.view.frame.end]); 

  return (
    <div id="time-container">
      <CalendarView />
      <CalendarList />
      <Modal isOpen={eventModal} onClose={() => setEventModal(false)}>
        <CreateEvent />
      </Modal>
      <button onClick={() => setEventModal(true)}>open</button>
    </div>
  );
}
