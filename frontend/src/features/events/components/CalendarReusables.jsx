import { useState, useEffect } from 'react';
import {
  TextField,
  SlideToggleText,
  Dropdown,
  RowSelect,
  Button,
} from '../../../components';
import { today, formatDate, weekHeaders } from '../util/dateUtil';
import { eventFormValidation } from '../util/eventFormUtil';

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
    date: formatDate(today),
    time: {
      hour: '12',
      minute: '00',
      period: 'AM',
    },
    reoccurring: {
      frequency: 'year',
      frame: 'allday',
      days: [],
      start: '',
      end: '',
    },
  });

  useEffect(() => {
    console.log(eventForm);
  }, [eventForm]);

  const handleEventInfo = (newValue) => {
    setEventForm((prev) => ({
      ...prev,
      info: newValue,
    }));
  };

  const handleEventDate = (newValue) => {
    setEventForm((prev) => ({
      ...prev,
      date: newValue,
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

  const handleReoccurringStart = (newValue) => {
    setEventForm((prev) => ({
      ...prev,
      reoccurring: {
        ...prev.reoccurring,
        start: newValue,
      },
    }));
  };

  const handleReoccurringEnd = (newValue) => {
    setEventForm((prev) => ({
      ...prev,
      reoccurring: {
        ...prev.reoccurring,
        end: newValue,
      },
    }));
  };

  return (
    <form
      className="event-form"
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        eventFormValidation(eventForm, setEventForm);
      }}
    >
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
      {eventForm.type === 'reoccurring' ? (
        <>
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
          {eventForm.reoccurring.frequency === 'week' ? (
            <RowSelect
              label="Weekdays"
              selectState={eventForm.reoccurring.days}
              setSelectState={handleEventDays}
              options={['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']}
              variant={'primary'}
            />
          ) : (
            ''
          )}
        </>
      ) : (
        ''
      )}
      {eventForm.type !== 'reoccurring' ||
      eventForm.reoccurring.frequency !== 'week' ? (
        <TextField
          label="Date"
          type="date"
          value={eventForm.date}
          onChange={(e) => handleEventDate(e.target.value)}
        />
      ) : (
        ''
      )}
      {eventForm.type === 'instance' ||
      (eventForm.type === 'reoccurring' &&
        eventForm.reoccurring.frame === 'instance') ? (
        <>
          <label htmlFor="">Time</label>
          <div className="time-row">
            <TextField
              type="number"
              value={eventForm.time.hour}
              onChange={(e) => {
                const num = Number(e.target.value);
                if (num >= 0 && num <= 12) {
                  handleEventHour(String(num).padStart(2, '0'));
                } else if (e.target.value === '') {
                  handleEventHour('');
                }
              }}
              variant={'primary'}
            />
            <p>:</p>
            <TextField
              type="number"
              value={eventForm.time.minute}
              onChange={(e) => {
                const num = Number(e.target.value);
                if (num >= 0 && num <= 59) {
                  handleEventMinute(String(num).padStart(2, '0'));
                } else if (e.target.value === '') {
                  handleEventMinute('');
                }
              }}
              variant={'primary'}
            />
            <Dropdown
              options={['AM', 'PM']}
              value={eventForm.time.period}
              onChange={handleEventPeriod}
              variant={'gray'}
            />
          </div>
        </>
      ) : (
        ''
      )}

      {eventForm.type === 'reoccurring' ? (
        <>
          <TextField
            label="Start"
            type="date"
            value={eventForm.reoccurring.start}
            onChange={(e) => handleReoccurringStart(e.target.value)}
          />
          <TextField
            label="End"
            type="date"
            value={eventForm.reoccurring.end}
            onChange={(e) => handleReoccurringEnd(e.target.value)}
          />
        </>
      ) : (
        ''
      )}
      <Button className="event-form-submit" type="submit">
        CREATE
      </Button>
    </form>
  );
}
