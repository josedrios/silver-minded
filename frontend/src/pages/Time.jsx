import { useState } from 'react';
import { CalendarView, CalendarList } from '../features/events';
import { CreateEvent } from '../features/events/components/CalendarReusables';
import {
  Modal
} from '../components'

export default function Time() {
  const [calendarRange, setCalendarRange] = useState({
    increment: 'week',
    year: '',
    month: '',
    week: '',
    day: '',
  });
  const [eventModal, setEventModal] = useState(false);
  const [createEventForm, setCreateEventForm] = useState({
    info: '',
    
  })

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
