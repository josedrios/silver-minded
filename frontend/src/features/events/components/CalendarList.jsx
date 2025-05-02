import {
  Button,
  Dropdown,
  ArrowLeftIcon,
  ArrowRightIcon
} from '../../../components';
import { WeekHeader } from './CalendarReusables';
import { useState } from 'react';

export default function CalendarList() {
  const [listRange, setListRange] = useState('Month');

  const handleSelectChange = (newValue) => {
    setListRange(newValue);
  };

  return (
    <div className="calendar-list-container">
      <CalendarListHeader
        listRange={listRange}
        handleSelectChange={handleSelectChange}
      />
      <WeekHeader />
      <WeekDisplay />
    </div>
  );
}

function CalendarListHeader({ listRange, handleSelectChange }) {
  return (
    <div className="calendar-list-header">
      <p>DATE</p>
      <div>
        <Dropdown
          options={['Month', 'Week', 'Day']}
          value={listRange}
          variant={'gray'}
          onChange={handleSelectChange}
        />
        <Button variant="gray" squared={true}>
          <ArrowLeftIcon />
        </Button>
        <Button variant="gray" squared={true}>
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
}

function MonthDisplay() {
  return (
    <div className="month-display">
      {/* {Array.from({ length: getFirstDay(year, month) }).map((_, i) => (
        <div className="calendar-day null" key={i} />
      ))}
      {Array.from({ length: getDaysInMonth(year, month) }).map((_, i) => (
        <button
          className={`calendar-day ${day === i + 1 ? 'today' : i + 1}`}
          key={i}
        >
          {i + 1}
        </button>
      ))}
      {Array.from({
        length: 35 - getDaysInMonth(year, month) - getFirstDay(year, month),
      }).map((_, i) => (
        <div className="calendar-day null" key={i} />
      ))} */}
    </div>
  );
}

function WeekDisplay() {
  return (
    <div className="week-display">
      {/* {Array.from({ length: 7 }).map((_, i) => (
        <button
          className={`calendar-day ${day === i + 1 ? 'today' : i + 1}`}
          key={i}
        >
          {i + 1}
        </button>
      ))} */}
    </div>
  );
}

function DayDisplay() {
  return <div className="day-display"></div>;
}
