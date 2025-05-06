import { createEvent } from '../services/eventService';
import { convertToUTC, formatDate, today } from '../index';
import { eventToLocal } from './dateUtil';
import dayjs from 'dayjs';

export const eventFormValidation = async (form, setForm, events, setEvents) => {
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
    updatedForm.date = convertToUTC(new Date(form.date + 'T00:00:00'))
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

  const newEvent = await createEvent(updatedForm);
  eventToLocal(newEvent);


  if(dayjs(newEvent.date).month() === events.month) {

    setEvents((prev) => {
    const updatedEvents = prev?.events || [];

    return {
      ...prev,
      events: [...updatedEvents, newEvent]
    }
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

  return;
};