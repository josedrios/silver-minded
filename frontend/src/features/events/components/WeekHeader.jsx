import { weekHeaders } from "../util/dateUtil";

export default function WeekHeader() {
  return (
    <div className="calendar-week-header">
      {weekHeaders.map((day, i) => (
        <div key={i}>{day.toUpperCase()}</div>
      ))}
    </div>
  );
}
