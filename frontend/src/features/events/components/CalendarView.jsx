import { Button, ArrowLeftIcon, ArrowRightIcon } from '../../../components';
import {
  day,
  month,
  year,
  getDaysInMonth,
  getFirstDay,
} from '../util/dateUtil';
import { WeekHeader } from './CalendarReusables';

export default function CalendarView({ events }) {
  return (
    <div className="calendar-view-container">
      <header className="calendar-view-header">
        <p>April 2025</p>
        <div className="calendar-view-header-btns">
          <Button variant="gray" squared={true}>
            <ArrowLeftIcon />
          </Button>
          <Button variant="gray" squared={true}>
            <ArrowRightIcon />
          </Button>
        </div>
      </header>
      <div className="calendar-view-body">
        <WeekHeader />
        <div className="calendar-days">
          {Array.from({ length: getFirstDay(year, month) }).map((_, i) => (
            <div className="calendar-day null" key={i}>
              -
            </div>
          ))}
          {Array.from({ length: getDaysInMonth(year, month) }).map((_, i) => {
            const currentDay = i + 1;
            const currentEvents = events.filter(
              (event) => new Date(event.date).getDate() === currentDay
            )

            return (
              <div
                className={`calendar-day ${
                  currentDay === new Date().getDate() ? 'today' : ''
                }`} 
                key={i}
              >
                {currentDay}
                <div className='dot-container'>
                {currentEvents.slice(0,3).map((_, index) => (
                  <div key={index} className='event-dot'/>
                ))}
                </div>
              </div>
            );
          })}
          {Array.from({
            length: 35 - getDaysInMonth(year, month) - getFirstDay(year, month),
          }).map((_, i) => (
            <div className="calendar-day null" key={i}>
              -
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
