export default function CalendarList({ events }) {
  return (
    <div className="calendar-list-container">
      <p className="list-header">UPCOMING EVENTS:</p>
      <div className="calendar-list-body">
        {events.events.map((event, i) => (
          <button className="calendar-list-item">
            <div className="item-header">{event.info}</div>
            <div className="item-footer">
              <p>
                {event.time.hour !== null ? `${event.time.hour}` : '24/7'}
              </p>
              <p>{event.reoccurring.frequency !== null ? 'REOC' : 'ONCE'}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}