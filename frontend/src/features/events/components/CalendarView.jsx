import {
  Button,
  ArrowLeftIcon,
  ArrowRightIcon
} from '../../../components';
import {
  day,
  month,
  year,
  getDaysInMonth,
  getFirstDay,
} from '../util/dateUtil';
import { WeekHeader } from './CalendarReusables';

export default function CalendarView() {
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
          {Array.from({ length: getDaysInMonth(year, month) }).map((_, i) => (
            <div
              className={`calendar-day ${day === i + 1 ? 'today' : i + 1}`}
              key={i}
            >
              {i + 1}
            </div>
          ))}
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
