import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { CalendarOverlay } from "../features/CalendarForm";
import { fetchEvents } from "../../util/eventUtil";

export default function Calendar() {
  const [calendarOverlay, setCalendarOverlay] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const loadEvents = async (month, year) => {
    const data = await fetchEvents(month, year);
    setEvents(data);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const now = new Date();
  const [timeFrame, setTimeFrame] = useState({
    year: now.getFullYear(),
    month: monthNames[now.getMonth()],
  });
  const monthIndex = monthNames.indexOf(timeFrame.month);

  useEffect(() => {
    loadEvents(monthIndex, timeFrame.year);
  }, []);

  useEffect(() => {
    console.log(selectedEvent);
  }, [selectedEvent]);

  return (
    <div id="calendar-page-container">
      <div id="calendar-container">
        <div id="calendar-month-navigation">
          <button className="month-navigation-buttons">
            <FaArrowLeftLong />
          </button>
          <p id="month-navigation-label">APRIL</p>
          <button className="month-navigation-buttons">
            <FaArrowRightLong />
          </button>
        </div>
        <div id="calendar-days">
          <p>S</p>
          <p>M</p>
          <p>T</p>
          <p>W</p>
          <p>T</p>
          <p>F</p>
          <p>S</p>
        </div>
        <div id="calendar-body">
          {Array.from({ length: 31 }).map((_, i) => (
            <button
              className={`calendar-date-button ${
                i % 2 === 0 ? "contains-events" : ""
              }`}
              key={i}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div id="calendar-year-navigation">
          <button className="year-navigation-buttons">
            <FaArrowLeftLong />
          </button>
          <p id="year-navigation-label">2025</p>
          <button className="year-navigation-buttons">
            <FaArrowRightLong />
          </button>
        </div>
      </div>
      <CalendarDetails
        setCalendarOverlay={setCalendarOverlay}
        events={events}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />
      <CalendarOverlay
        calendarOverlay={calendarOverlay}
        setCalendarOverlay={setCalendarOverlay}
        events={events}
        setEvents={setEvents}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        loadEvents={loadEvents}
        timeFrame={timeFrame}
        setTimeFrame={setTimeFrame}
        monthIndex={monthIndex}
      />
    </div>
  );
}

function CalendarDetails({
  setCalendarOverlay,
  events,
  selectedEvent,
  setSelectedEvent,
}) {
  const groupedByDay = events.reduce((acc, event) => {
    const day = new Date(event.dueAt).getDate(); // 1–31
    if (!acc[day]) acc[day] = [];
    acc[day].push(event);
    return acc;
  }, {});

  return (
    <div id="calendar-details">
      <div id="calendar-upcoming">
        <div id="upcoming-header">
          <p>UPCOMING</p>
          <button
            className="calendar-event-button"
            onClick={() => {
              setCalendarOverlay((prev) => !prev);
            }}
          >
            Create/Edit
          </button>
        </div>
        <div id="upcoming-body">
          {Object.entries(groupedByDay).map(([day, dayEvents]) => (
            <UpcomingDay
              key={day}
              day={day}
              events={dayEvents}
              selectedEvent={selectedEvent}
              setSelectedEvent={setSelectedEvent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function UpcomingDay({ day, events, selectedEvent, setSelectedEvent }) {
  return (
    <div className="upcoming-day">
      <p className="upcoming-day-label">{String(day).padStart(2, "0")}</p>

      <div className="upcoming-events">
        {events.map((event, idx) => (
          <CalendarEvent
            key={idx}
            event={event}
            index={idx + 1}
            day={day}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
          />
        ))}
      </div>
    </div>
  );
}

function CalendarEvent({ event, index, day, selectedEvent, setSelectedEvent }) {
  return (
    <button
      className={`event-container ${
        selectedEvent && selectedEvent._id === event._id ? "selected-event" : ""
      }`}
      onClick={() => {
        selectedEvent && selectedEvent._id === event._id
          ? setSelectedEvent(null)
          : setSelectedEvent(event);
      }}
    >
      <p className="event-label">
        {String(day).padStart(2, "0")}.{index} -
      </p>{" "}
      <p className="event-info">{event.info}</p>
    </button>
  );
}
