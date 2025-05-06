import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { CalendarView, fetchEvents, CalendarList } from '../features/events';
import { CreateEvent } from '../features/events';
import { Modal } from '../components';
import {
  eventToLocal,
  formatDate,
  today,
} from '../features/events/util/dateUtil';

export default function Time() {
  const { events, setEvents } = useContext(AppContext);
  const [eventModal, setEventModal] = useState(false);

  useEffect(() => {
    const fetchAndUpdateEvents = async () => {
      const fetchedEvents = await fetchEvents(events.year, events.month);

      fetchedEvents.forEach((event) => {
        eventToLocal(event);
      });

      console.log(fetchedEvents);

      setEvents((prev) => ({
        ...prev,
        events: fetchedEvents,
      }));
    };

    fetchAndUpdateEvents();
  }, [events.month, events.year]);

  const [eventForm, setEventForm] = useState({
    info: '',
    type: 'allday',
    date: formatDate(today),
    time: {
      hour: '08',
      minute: '00',
    },
    reoccurring: {
      frequency: 'year',
      frame: 'allday',
      days: [],
      start: '',
      end: '',
    },
  });

  return (
    <div id="time-container">
      <CalendarView
        events={events}
        setEvents={setEvents}
        setEventModal={setEventModal}
        setEventForm={setEventForm}
      />
      <CalendarList events={events} />
      <Modal isOpen={eventModal} onClose={() => setEventModal(false)}>
        <CreateEvent
          events={events}
          setEvents={setEvents}
          eventForm={eventForm}
          setEventForm={setEventForm}
        />
      </Modal>
    </div>
  );
}
