import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import {
  CalendarView,
  fetchEvents,
  CalendarList,
  eventToLocal,
  formatDate,
  today,
  CreateEvent,
  selectedToForm,
} from '../features/events';
import { Modal } from '../components';

export default function Time() {
  const { events, setEvents } = useContext(AppContext);
  const [eventModal, setEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    console.log(selectedEvent);
  }, [selectedEvent]);

  useEffect(() => {
    const fetchAndUpdateEvents = async () => {
      const fetchedEvents = await fetchEvents(events.year, events.month);

      fetchedEvents.forEach((event) => {
        eventToLocal(event);
      });

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

  useEffect(() => {
    if (selectedEvent !== '') {
      setEventForm(selectedToForm(selectedEvent));
      setEventModal(true);
    }
  }, [selectedEvent]);

  useEffect(() => {
    if (!eventModal) {
      setSelectedEvent('');
      setEventForm({
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
    }
  }, [eventModal]);

  return (
    <div id="time-container">
      <CalendarView
        events={events}
        setEvents={setEvents}
        setEventModal={setEventModal}
        setEventForm={setEventForm}
      />
      <CalendarList
        events={events}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />
      <Modal isOpen={eventModal} onClose={() => setEventModal(false)}>
        <CreateEvent
          events={events}
          setEvents={setEvents}
          eventForm={eventForm}
          setEventForm={setEventForm}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      </Modal>
    </div>
  );
}
