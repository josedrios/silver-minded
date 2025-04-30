import { useState } from 'react';
import {
  TextField,
  SlideToggleText,
  Dropdown,
  RowSelect,
  Button
} from '../../../components';
import { weekHeaders } from '../util/dateUtil';

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
  const [eventForm, setEventForm] = useState({
    info: '',
    type: 'allday',
    date: '',
    time: {
      hour: '12',
      minute: '00',
      period: 'AM',
    },
    reoccurring: {
      frequency: 'year',
      frame: 'allday',
      days: [],
    },
  });

  const handleEventInfo = (newValue) => {
    setEventForm((prev) => ({
      ...prev,
      info: newValue,
    }));
  };

  const handleEventType = (newValue) => {
    setEventForm((prev) => ({
      ...prev,
      type: newValue,
    }));
  };

  const handleEventHour = (newValue) => {
    setEventForm((prev) => ({
      ...prev,
      time: {
        ...prev.time,
        hour: newValue,
      },
    }));
  };

  const handleEventMinute = (newValue) => {
    setEventForm((prev) => ({
      ...prev,
      time: {
        ...prev.time,
        minute: newValue,
      },
    }));
  };

  const handleEventPeriod = (newValue) => {
    setEventForm((prev) => ({
      ...prev,
      time: {
        ...prev.time,
        period: newValue,
      },
    }));
  };

  const handleEventFrequency = (newValue) => {
    setEventForm((prev) => ({
      ...prev,
      reoccurring: {
        ...prev.reoccurring,
        frequency: newValue,
      },
    }));
  };

  const handleEventFrame = (newValue) => {
    setEventForm((prev) => ({
      ...prev,
      reoccurring: {
        ...prev.reoccurring,
        frame: newValue,
      },
    }));
  };

  const handleEventDays = (newValue) => {
    setEventForm((prev) => ({
      ...prev,
      reoccurring: {
        ...prev.reoccurring,
        days: newValue,
      },
    }));
  };

  return (
    <form className="event-form" action="">
      <h5>Create Event Form</h5>
      <TextField
        label={'Info'}
        placeholder={'Enter event info...'}
        value={eventForm.info}
        onChange={(e) => handleEventInfo(e.target.value)}
      />
      <SlideToggleText
        label={'Type'}
        toggleState={eventForm.type}
        setToggleState={handleEventType}
        options={['allday', 'instance', 'reoccurring']}
        variant={'primary'}
      />
      <SlideToggleText
        label={'Frequency'}
        toggleState={eventForm.reoccurring.frequency}
        setToggleState={handleEventFrequency}
        options={['year', 'month', 'week']}
        variant={'primary'}
      />
      <SlideToggleText
        label={'Frame'}
        toggleState={eventForm.reoccurring.frame}
        setToggleState={handleEventFrame}
        options={['allday', 'instance']}
        variant={'primary'}
      />
      <RowSelect
        label="Weekdays"
        selectState={eventForm.reoccurring.days}
        setSelectState={handleEventDays}
        options={['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']}
        variant={'primary'}
      />
      <TextField label="Date" type="date" />
      <label htmlFor="">Time</label>
      <div className="time-row">
        <TextField
          value={eventForm.time.hour}
          onChange={(e) => handleEventHour(e.target.value)}
          variant={'primary'}
        />
        <p>:</p>
         <TextField
          value={eventForm.time.minute}
          onChange={(e) => handleEventMinute(e.target.value)}
          variant={'primary'}
        />
        <Dropdown 
          options={['AM', 'PM']}
          value={eventForm.time.period}
          onChange={handleEventPeriod}
          variant={'gray'}
        />
      </div>
      <Button className='event-form-submit'>
        Create
      </Button>
    </form>
  );
}
