import {
  convertToUTC,
  formatDate,
  createEvent,
  editEvent,
  convertToLocal,
  fetchEvents
} from '..';
import dayjs from 'dayjs';

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

export const eventFormValidation = async (
  form,
  setForm,
  events,
  setEvents,
  selectedEvent
) => {
  let updatedForm = { ...form };

  if (form.type === 'allday') {
    updatedForm.time = {
      hour: null,
      minute: null,
    };
  }

  if (form.type === 'instance' || form.type === 'allday') {
    updatedForm.reoccurring = {
      frequency: null,
      frame: null,
      days: null,
      start: null,
      end: null,
    };
  } else if (form.type === 'reoccurring') {
    if (form.reoccurring.start === '') {
      updatedForm.reoccurring = {
        ...updatedForm.reoccurring,
        start: null,
      };
    }
    if (form.reoccurring.end === '') {
      updatedForm.reoccurring = {
        ...updatedForm.reoccurring,
        end: null,
      };
    }
    if (form.reoccurring.frequency !== 'week') {
      updatedForm.reoccurring = {
        ...updatedForm.reoccurring,
        days: null,
      };
    }
    if (form.reoccurring.frequency === 'week') {
      updatedForm.date = null;
    }
    if (form.reoccurring.frame === 'allday') {
      updatedForm.time = {
        hour: null,
        minute: null,
      };
    }
  }

  if (updatedForm.date !== null) {
    updatedForm.date = convertToUTC(new Date(form.date + 'T00:00:00'));
  }

  if (updatedForm.reoccurring.start !== null) {
    updatedForm.reoccurring = {
      ...updatedForm.reoccurring,
      start: convertToUTC(new Date(form.reoccurring.start + 'T00:00:00')),
    };
  }

  if (updatedForm.reoccurring.end !== null) {
    updatedForm.reoccurring = {
      ...updatedForm.reoccurring,
      end: convertToUTC(new Date(form.reoccurring.end + 'T23:59:59.999')),
    };
  }

  let newEvent;

  if (selectedEvent === '') {
    newEvent = await createEvent(updatedForm);
  } else {
    newEvent = await editEvent(updatedForm, selectedEvent._id);
  }

  // Converting the returned event (from createEvent or editEvent) to have local dates
  eventToLocal(newEvent);

  if (dayjs(newEvent.date).month() === events.month) {
    setEvents((prev) => {
      const updatedEvents = prev?.events || [];

      return {
        ...prev,
        events: [...updatedEvents, newEvent],
      };
    });
  }

  setForm({
    info: '',
    type: 'allday',
    date: form.date,
    time: {
      hour: '08',
      minute: '00',
    },
    reoccurring: {
      frequency: 'year',
      frame: 'allday',
      days: [],
      start: '',
      end: '',
    },
  });

  fetchAndUpdateEvents(events, setEvents)

  return;
};

export const selectedToForm = (event) => {
  return {
    info: event.info,
    type:
      event.reoccurring.frequency !== null
        ? 'reoccurring'
        : event.time.hour !== null
        ? 'instance'
        : 'allday',
    date: event.date !== null ? formatDate(event.date) : null,
    time: event.time,
    reoccurring: {
      frequency:
        event.reoccurring.frequency !== null
          ? event.reoccurring.frequency
          : 'year',
      frame:
        event.reoccurring.frame !== null ? event.reoccurring.frame : 'allday',
      days: event.reoccurring.days !== null ? event.reoccurring.days : [],
      start: formatDate(event.reoccurring.start),
      end: formatDate(event.reoccurring.end),
    },
  };
};

export const fetchAndUpdateEvents = async (events, setEvents) => {
  const fetchedEvents = await fetchEvents(events.year, events.month);

  fetchedEvents.forEach((event) => {
    eventToLocal(event);
  });

  setEvents((prev) => ({
    ...prev,
    events: fetchedEvents,
  }));
};
