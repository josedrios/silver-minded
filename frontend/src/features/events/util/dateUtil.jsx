import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const weekHeaders = ['s', 'm', 't', 'w', 't', 'f', 's'];
export const today = new Date();

export const formatDate = (date = new Date()) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const beforeEmptyDays = (year, month) => {
  const days = new Date(year, month, 1).getDay();
  return days;
};

export const getDaysInMonth = (year, month) => {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
};

export const getMonthName = (monthIndex) => {
  return dayjs().month(monthIndex).format('MMMM');
};

export const changeMonth = (setFrame, type = true) => {
  setFrame((prev) => {
    const newMonth = type
      ? prev.month === 11
        ? 0
        : prev.month + 1
      : prev.month === 0
      ? 11
      : prev.month - 1;
    const newYear =
      prev.month === 11 && type
        ? prev.year + 1
        : prev.month === 0 && !type
        ? prev.year - 1
        : prev.year;

    return { ...prev, month: newMonth, year: newYear };
  });
};

export const getCalendarDay = (year, month, day) => {
  return formatDate(dayjs(new Date(year, month, day)).format('YYYY-MM-DD'));
}

export const getStartEndDates = (year, month) => {
  const start = dayjs(
    `${year}-${(month + 1).toString().padStart(2, '0')}-01`
  ).startOf('month');
  const end = start.endOf('month');

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
};

export const convertToUTC = (date) => {
  console.log(date)
  return dayjs(date).utc().toISOString();
};

export const convertToLocal = (date) => {
  return dayjs.utc(date).local().format();
};

export const eventToLocal = (event) => {
  event.createdAt = convertToLocal(event.createdAt);
  if (event.date !== null) {
    event.date = convertToLocal(event.date);
  }
  if (event.reoccurring.start !== null) {
    event.reoccurring.start = convertToLocal(event.reoccurring.start);
  }
  if (event.reoccurring.end !== null) {
    event.reoccurring.end = convertToLocal(event.reoccurring.end);
  }
};