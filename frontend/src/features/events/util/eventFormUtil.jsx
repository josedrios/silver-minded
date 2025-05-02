import { createEvent } from '../services/eventService';

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

  setForm({
    info: '',
    type: 'allday',
    date: "",
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
