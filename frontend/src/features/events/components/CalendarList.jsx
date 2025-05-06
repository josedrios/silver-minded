import dayjs from 'dayjs';

export default function CalendarList({ events }) {
  return (
    <div className="calendar-list-container">
      <p className="list-header">UPCOMING EVENTS:</p>
      <div className="calendar-list-body">
        {events.events.length !== 0 ? (
          events.events.map((event, i) => (
            <button className="calendar-list-item" key={i}>
              <div className="item-header">
                {dayjs(event.date).date()}-{event.info}
              </div>
              <div className="item-footer">
                <p>{event.time.hour !== null ? `${event.time.hour}` : ''}</p>
                <p>{event.reoccurring.frequency !== null ? 'REOC' : 'ONCE'}</p>
              </div>
            </button>
          ))
        ) : (
          <p>No events</p>
        )}
      </div>
    </div>
  );
}
