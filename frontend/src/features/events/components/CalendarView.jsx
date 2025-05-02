import { Button, ArrowLeftIcon, ArrowRightIcon } from '../../../components';
import {
  getMonthName,
  beforeEmptyDays,
  getDaysInMonth,
  changeMonth,
  today,
} from '../util/dateUtil';
import { WeekHeader } from './CalendarReusables';

export default function CalendarView({ events, setEvents }) {
  return (
    <div className="calendar-view-container">
      <header className="calendar-view-header">
        <p>
          {getMonthName(events.month)} {events.year}
        </p>
        <div className="calendar-view-header-btns">
          <Button
            variant="gray"
            squared={true}
            onClick={() => changeMonth(setEvents, false)}
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            variant="gray"
            squared={true}
            onClick={() => changeMonth(setEvents, true)}
          >
            <ArrowRightIcon />
          </Button>
        </div>
      </header>
      <div className="calendar-view-body">
        <WeekHeader />
        <div className="calendar-days">
          {/* DAYS BEFORE FIRST REAL DAY IN MONTH */}
          {Array.from({
            length: beforeEmptyDays(events.year, events.month),
          }).map((_, i) => (
            <div className="calendar-day null" key={i} />
          ))}

          {/* PRINT ALL THE DAYS IN THE MONTH */}
          {Array.from({
            length: getDaysInMonth(events.year, events.month),
          }).map((_, i) => {
            const currentDay = i + 1;
            // const currentEvents = events.view.events.filter((event) => {
            //   const eventDate = new Date(event.date);
            //   const eventDay = eventDate.getDate();
            //   return eventDay === currentDay;
            // });

            return (
              <div
                className={`calendar-day ${
                  currentDay === today.getDate() &&
                  events.month === today.getMonth() && 
                  events.year === today.getFullYear()
                    ? 'today'
                    : ''
                }`}
                key={i}
              >
                {currentDay}
                <div className="dot-container">
                  {/* {currentEvents.slice(0, 3).map((_, index) => (
                    <div key={index} className="event-dot" />
                  ))} */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
