import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useState,useContext } from "react";
import { CalendarOverlay } from "../features/CalendarForm";
import { fetchEvents } from "../../util/eventUtil";
import { IoIosAdd } from "react-icons/io";
import { AppContext } from "../../util/AppContext";

export default function Calendar() {
  const { events, setEvents } = useContext(AppContext);
  const [calendarOverlay, setCalendarOverlay] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
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
    month: now.getMonth(),
  });

  useEffect(() => {
    loadEvents(timeFrame.month, timeFrame.year);
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      setCalendarOverlay(true);
    }
  }, [selectedEvent]);

  useEffect(() => {
    if (!calendarOverlay) {
      setSelectedEvent(null);
      setSelectedDay(null);
    }
  }, [calendarOverlay]);

  const incrementMonth = (type) => {
    setTimeFrame((prev) => {
      const newMonth =
        type === "decrease"
          ? prev.month === 0
            ? 11
            : prev.month - 1
          : prev.month === 11
          ? 0
          : prev.month + 1;

      const newYear =
        type === "decrease"
          ? prev.month === 0
            ? prev.year - 1
            : prev.year
          : prev.month === 11
          ? prev.year + 1
          : prev.year;

      loadEvents(newMonth, newYear);

      return { year: newYear, month: newMonth };
    });
  };

  useEffect(() => {
    if (selectedDay) {
      setCalendarOverlay(true);
    }
  }, [selectedDay]);

  // Amount of empty, unwanted days shown on calendar view before the first day of the month
  const nullDays = new Date(timeFrame.year, timeFrame.month, 1).getDay();

  const groupedByDay = events.reduce((acc, event) => {
    const date = new Date(event.dueAt);
    const eventMonth = date.getMonth();
    const eventDay = date.getDate();

    const isCurrentMonth =
      eventMonth === timeFrame.month && date.getFullYear() === timeFrame.year;
    const isYearlyRecurring =
      event.reoccurring === "yearly" && eventMonth === timeFrame.month;
    const isMonthlyRecurring = event.reoccurring === "monthly";

    const daysInMonth = new Date(
      timeFrame.year,
      timeFrame.month + 1,
      0
    ).getDate();
    const targetDay = Math.min(eventDay, daysInMonth);

    if (isCurrentMonth || isYearlyRecurring || isMonthlyRecurring) {
      if (!acc[targetDay]) acc[targetDay] = [];
      acc[targetDay].push(event);
    }

    return acc;
  }, {});

  return (
    <div id="calendar-page-container">
      <div id="calendar-container">
        <div id="calendar-month-navigation">
          <button
            className="month-navigation-buttons"
            onClick={(e) => {
              incrementMonth("decrease");
            }}
          >
            <FaArrowLeftLong />
          </button>
          <p id="month-navigation-label">{monthNames[timeFrame.month]}</p>
          <button
            className="month-navigation-buttons"
            onClick={(e) => {
              incrementMonth("increase");
            }}
          >
            <FaArrowRightLong />
          </button>
        </div>
        <div id="calendar-days">
          <p>Sun</p>
          <p>Mon</p>
          <p>Tue</p>
          <p>Wed</p>
          <p>Thu</p>
          <p>Fri</p>
          <p>Sat</p>
        </div>
        <div id="calendar-body">
          {Array.from({ length: nullDays }).map((_, i) => (
            <div className={`calendar-date-button null-days`} key={i} />
          ))}
          {Array.from({ length: 31 }).map((_, i) => {
            const hasEvents = groupedByDay[i + 1]?.length > 0;
            const isPast =
              new Date(timeFrame.year, timeFrame.month, i + 1) <
              new Date(now.getFullYear(), now.getMonth(), now.getDate());

            return (
              <button
                className={`calendar-date-button ${
                  hasEvents ? "contains-events" : ""
                } ${
                  timeFrame.month === now.getMonth() && i + 1 === now.getDate()
                    ? "current-day"
                    : ""
                }
                ${isPast && hasEvents ? "past-day" : ""}
                `}
                key={i}
                onClick={() => {
                  setSelectedDay(i + 1);
                }}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
        <div id="calendar-year-navigation">
          <button
            className="year-navigation-buttons"
            onClick={() =>
              setTimeFrame((prev) => {
                const newYear = prev.year - 1;
                loadEvents(prev.month, newYear);
                return { ...prev, year: newYear };
              })
            }
          >
            <FaArrowLeftLong />
          </button>
          <p id="year-navigation-label">{timeFrame.year}</p>
          <button
            className="year-navigation-buttons"
            onClick={() =>
              setTimeFrame((prev) => {
                const newYear = prev.year + 1;
                loadEvents(prev.month, newYear);
                return { ...prev, year: newYear };
              })
            }
          >
            <FaArrowRightLong />
          </button>
        </div>
      </div>
      <CalendarDetails
        setCalendarOverlay={setCalendarOverlay}
        events={events}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        groupedByDay={groupedByDay}
        monthNames={monthNames}
        monthIndex={timeFrame.month}
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
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
    </div>
  );
}

function CalendarDetails({
  setCalendarOverlay,
  events,
  selectedEvent,
  setSelectedEvent,
  groupedByDay,
  monthNames,
  monthIndex
}) {
  return (
    <div id="calendar-details">
      <div id="calendar-upcoming">
        <div id="upcoming-header">
          <p>UPCOMING {monthNames[monthIndex].toUpperCase()}</p>
          <button
            className="calendar-event-button"
            onClick={() => {
              setCalendarOverlay((prev) => !prev);
            }}
          >
            <IoIosAdd />
          </button>
        </div>
        <div id="upcoming-body">
          {Object.entries(groupedByDay).length === 0 ? (
            <div id="no-upcoming">No upcoming events...</div>
          ) : (
            Object.entries(groupedByDay).map(([day, dayEvents]) => (
              <UpcomingDay
                key={day}
                day={day}
                events={dayEvents}
                selectedEvent={selectedEvent}
                setSelectedEvent={setSelectedEvent}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function UpcomingDay({ day, events, selectedEvent, setSelectedEvent }) {
  const now = new Date();

  return (
    <div className="upcoming-day">
      <p className={`upcoming-day-label 
        ${now.getDate() === parseInt(day) && now.getMonth() === new Date(events[0].dueAt).getMonth() && now.getFullYear() === new Date(events[0].dueAt).getFullYear() ? 'current-day-label' : ''}`}
      >{String(day).padStart(2, "0")}</p>

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
      onClick={(e) => {
        e.currentTarget.blur();
        selectedEvent && selectedEvent._id === event._id
          ? setSelectedEvent(null)
          : setSelectedEvent(event);
      }}
    >
      {event.info}
    </button>
  );
}
