export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const weekHeaders = ['s', 'm', 't', 'w', 't', 'f', 's'];

export const today = new Date();
export const formattedToday = new Date().toISOString().split('T')[0];

export const time = today.getTime();
export const day = today.getDate();
export const month = today.getMonth();
export const year = today.getFullYear();

export const getMonthName = (monthNumber) => {
  return monthNames[monthNumber];
};

export const getFirstDay = (year, month) => {
  return new Date(year, month, 1).getDay();
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getWeeksInMonth = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const used = firstDay.getDay() + lastDay.getDate();

  return Math.ceil(used / 7);
};

export const getCurrentWeekOfMonth = (date = new Date()) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  return Math.ceil((date.getDate() + firstDay.getDay()) / 7);
};

export const getWeekRange = (year, month, week) => {};
