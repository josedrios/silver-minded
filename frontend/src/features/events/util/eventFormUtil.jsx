import { createEvent } from '../services/eventService';
import { convertToUTC, formatDate, today } from '../index';

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
      updatedForm.date = {
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

  if (updatedForm.date !== null) {
    updatedForm.date = convertToUTC(new Date(updatedForm.date + 'T00:00:00'))
  }

  if (updatedForm.reoccurring.start !== null) {
    updatedForm.reoccurring = {
      ...updatedForm.reoccurring,
      start: convertToUTC(new Date(form.reoccurring.start + 'T00:00:00')),
    };
  }

  if (updatedForm.reoccurring.start !== null) {
    updatedForm.reoccurring = {
      ...updatedForm.reoccurring,
      end: convertToUTC(new Date(form.reoccurring.start + 'T23:59:59.999')),
    };
  }

  console.log('FORM DATE:', form.date);
  console.log('UP FORM DATE:', updatedForm.date);

  const newEvent = await createEvent(updatedForm);

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