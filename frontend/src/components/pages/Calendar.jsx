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
    month: monthNames[now.getMonth()]
  })

  useEffect(() => {
    loadEvents(timeFrame.month, timeFrame.year);
  }, []);

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
      <CalendarDetails setCalendarOverlay={setCalendarOverlay} />
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
        monthNames={monthNames}
      />
    </div>
  );
}

function CalendarDetails({ setCalendarOverlay, setShowOverlay }) {
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
          <div className="upcoming-day">
            <p className="upcoming-day-label">01</p>

            <div className="upcoming-events">
              <CalendarEvent />
              <CalendarEvent />
              <CalendarEvent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CalendarEvent() {
  return (
    <button className="event-container">
      <p className="event-label">01.1 /</p>
      <p className="event-info">This is an example event</p>
    </button>
  );
}
