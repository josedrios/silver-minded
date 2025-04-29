import {
  TextField
} from '../../../components';
import { weekHeaders } from "../util/dateUtil";

export function WeekHeader() {
  return (
    <div className="calendar-week-header">
      {weekHeaders.map((day, i) => (
        <div key={i}>{day.toUpperCase()}</div>
      ))}
    </div>
  );
}

export function CreateEvent() {
    return (
        <form action="">
          <h5>Create Event Form:</h5>
          <TextField 
            label={'Info'}
          />
          <TextField 
            label={'Date'}
            type={'datetime-local'}
          />
        </form>
    )
}
