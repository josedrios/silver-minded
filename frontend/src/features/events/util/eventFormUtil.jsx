import { createEvent } from '../services/eventService';
import { formattedToday } from './dateUtil';

export const eventFormValidation = async (form, setForm) => {
  if (form.type === 'allday') {
    setForm((prev) => ({
      ...prev,
      time: null,
      reoccurring: null,
    }));
  } else if (form.type === 'instance') {
    setForm((prev) => ({
      ...prev,
      reoccurring: null,
    }));
  } else if (form.type === 'reoccurring') {
    if (form.start === '') {
      setForm((prev) => ({
        ...prev,
        reoccurring: {
          ...prev.reoccurring,
          start: null,
        },
      }));
    }
    if (form.end === '') {
      setForm((prev) => ({
        ...prev,
        reoccurring: {
          ...prev.reoccurring,
          end: null,
        },
      }));
    }
    if (form.frequency !== 'week') {
      setForm((prev) => ({
        ...prev,
        reoccurring: {
          ...prev.reoccurring,
          days: null,
        },
      }));
    }
    if (form.frequency === 'week') {
      setForm((prev) => ({
        ...prev,
        reoccurring: {
          ...prev.reoccurring,
          date: null,
        },
      }));
    }
    if (form.frame !== 'instance') {
      setForm((prev) => ({
        ...prev,
        reoccurring: {
          ...prev.reoccurring,
          time: null,
        },
      }));
    }
  }

  console.log('CHECKPOINT: eventFormUtil.jsx');
  await createEvent(form);

  setForm({
    info: '',
    type: 'allday',
    date: formattedToday,
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
