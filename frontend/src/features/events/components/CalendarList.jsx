import dayjs from 'dayjs';
import { getMonthName } from '../util/dateUtil';

export default function CalendarList({
  events,
  selectedEvent,
  setSelectedEvent,
}) {
  const currentYear = events.year;
  const currentMonth = events.month;
  return (
    <div className="calendar-list-container">
      <h4 className="list-header">Upcoming Events:</h4>
      <div className="calendar-list-body">
        {events.events.length !== 0 ? (
          events.events.map((event, i) => (
            <EventCard
              event={event}
              year={currentYear}
              month={currentMonth}
              key={i}
              selectedEvent={selectedEvent}
              setSelectedEvent={setSelectedEvent}
            />
          ))
        ) : (
          <p className='empty-list-quote'>No events</p>
        )}
      </div>
    </div>
  );
}

function EventCard({ event, year, month, selectedEvent, setSelectedEvent }) {
  return (
    <button
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
          {event.time.hour < 10 ? '0' : ''}{event.time.hour}:{event.time.minute < 10 ? '0' : ''}{event.time.minute}
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
    </button>
  );
}
