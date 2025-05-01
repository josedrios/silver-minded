import { createEvent } from '../services/eventService';
import { formatDate, today } from './dateUtil';

export const eventFormValidation = async (form, setForm, events, setEvents) => {

  let updatedForm = { ...form };

  if (form.type === 'allday') {
    updatedForm.time = {
      hour: null,
      minute: null,
      period: null,
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
      updatedForm.reoccurring = {
        ...updatedForm.reoccurring,
        date: null,
      };
    }
    if (form.reoccurring.frame === 'allday') {
      updatedForm.time = {
        hour: null,
        minute: null,
        period: null,
      };
    }
  }

  const newEvent = await createEvent(updatedForm);

  console.log(`NEW EVENT: ${newEvent}`);

  setEvents((prev) => {
    const updatedEvents = prev?.view?.events || []; // Default to an empty array if undefined
    return {
      ...prev,
      view: {
        ...prev.view,
        events: [...updatedEvents, newEvent], // Add the new event to the events array
      },
    };
  });

  setForm({
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

  return;
};
