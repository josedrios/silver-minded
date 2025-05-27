import dayjs from 'dayjs';
import { getMonthName } from '../util/dateUtil';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const list = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: -15 },
  visible: { opacity: 1, y: 0, transition: { type: 'tween', duration: 0.3 } },
};

export default function CalendarList({
  events,
  selectedEvent,
  setSelectedEvent,
}) {
  const today = new Date();
  const currentYear = events.year;
  const currentMonth = events.month;

  const pastEvents = events.events.filter((event) => {
    const eventDate = new Date(event.date);
    console.log(
      `Event: ${eventDate.toLocaleString()}, Today: ${today.toLocaleString()}`
    );
    return (
      eventDate < today && new Date(eventDate).getDate() !== today.getDate()
    );
  });

  const [showPastEvents, setShowPastEvents] = useState(false);

  return (
    <div className="calendar-list-container">
      <h4 className="list-header">Upcoming Events:</h4>
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={list}
          className="calendar-list-body"
        >
          {pastEvents.length !== 0 ? (
            <button
              className="show-past-events"
              onClick={() => setShowPastEvents((prev) => !prev)}
            >
              {showPastEvents ? 'HIDE' : 'SHOW'} PAST EVENTS
            </button>
          ) : (
            ''
          )}
          {events.events.length !== 0 && showPastEvents ? (
            <>
              {pastEvents.map((event, i) => (
                <EventCard
                  event={event}
                  year={currentYear}
                  month={currentMonth}
                  key={i}
                  selectedEvent={selectedEvent}
                  setSelectedEvent={setSelectedEvent}
                />
              ))}
              <motion.div
                layout
                variants={item}
                exit={{ opacity: 0, y: 20 }}
                className="current-marker"
              >
                CURRENT <div />
              </motion.div>
            </>
          ) : (
            ''
          )}
          {events.events.length !== 0 ? (
            events.events.map((event, i) =>
              new Date(event.date) >= today ||
              new Date(event.date).getDate() === today.getDate() ? (
                <EventCard
                  event={event}
                  year={currentYear}
                  month={currentMonth}
                  key={i}
                  selectedEvent={selectedEvent}
                  setSelectedEvent={setSelectedEvent}
                />
              ) : (
                ''
              )
            )
          ) : (
            <motion.p
              layout
              variants={item}
              exit={{ opacity: 0, y: 20 }}
              className="empty-list-quote"
            >
              No events
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function EventCard({ event, year, month, selectedEvent, setSelectedEvent }) {
  return (
    <motion.button
      layout
      variants={item}
      exit={{ opacity: 0, y: 20 }}
      className={`calendar-list-item ${
        selectedEvent._id === event._id ? 'selected' : ''
      }`}
      onClick={() => {
        if (selectedEvent._id === event._id) {
          setSelectedEvent('');
        } else {
          setSelectedEvent(event);
        }
      }}
    >
      <p className="event-header">{event.info}</p>
      {event.date !== null ? (
        <p className="event-sub">
          <span className="branch">
            {event.reoccurring.frequency === null && event.time.hour === null
              ? '└─'
              : '├─'}
          </span>{' '}
          {dayjs(event.date).date()} {getMonthName(month).toUpperCase()} {year}
        </p>
      ) : (
        ''
      )}
      {event.time.hour !== null ? (
        <p className="event-sub">
          <span className="branch">
            {event.reoccurring.frequency === null ? '└─' : '├─'}
          </span>{' '}
          {event.time.hour < 10 ? '0' : ''}
          {event.time.hour}:{event.time.minute < 10 ? '0' : ''}
          {event.time.minute}
        </p>
      ) : (
        ''
      )}
      {event.reoccurring.frequency !== null ? (
        <p className="event-sub">
          <span className="branch">└─</span>{' '}
          {event.reoccurring.frequency.toUpperCase()}LY
        </p>
      ) : (
        ''
      )}
    </motion.button>
  );
}
