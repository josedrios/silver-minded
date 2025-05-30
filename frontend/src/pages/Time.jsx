import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import {
  CalendarView,
  CalendarList,
  formatDate,
  today,
  CreateEvent,
  selectedToForm,
  fetchAndUpdateEvents,
} from '../features/events';
import { Modal } from '../components';
import { motion } from 'motion/react';

export default function Time() {
  const { events, setEvents } = useContext(AppContext);
  const [eventModal, setEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    fetchAndUpdateEvents(events, setEvents);
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
    <motion.div
      id="time-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
    >
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
          setEventModal={setEventModal}
        />
      </Modal>
    </motion.div>
  );
}
