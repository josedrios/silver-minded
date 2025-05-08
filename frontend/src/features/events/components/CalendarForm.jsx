import {
  TextField,
  SlideToggleText,
  RowSelect,
  Button,
  TrashIcon,
} from '../../../components';
import { deleteEvent, eventFormValidation, fetchAndUpdateEvents } from '../';

export function CreateEvent({
  events,
  setEvents,
  eventForm,
  setEventForm,
  selectedEvent,
  setEventModal,
}) {
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
        eventFormValidation(
          eventForm,
          setEventForm,
          events,
          setEvents,
          selectedEvent
        );
      }}
    >
      <h5>{selectedEvent ? 'Edit' : 'Create'} Event</h5>
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
                if (num >= 0 && num <= 23) {
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
      <div className="event-form-footer">
        <Button className="event-form-submit" type="submit">
          {selectedEvent === '' ? 'CREATE' : 'EDIT'}
        </Button>
        {selectedEvent !== '' ? (
          <Button
            squared={true}
            variant="error"
            onClick={async() => {
              await deleteEvent(selectedEvent._id);
              fetchAndUpdateEvents(events, setEvents);
              setEventModal(false);
            }}
          >
            <TrashIcon />
          </Button>
        ) : (
          ''
        )}
      </div>
    </form>
  );
}
