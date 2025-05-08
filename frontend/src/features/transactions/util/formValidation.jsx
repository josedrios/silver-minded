import { createTransaction } from '../';

export const formValidation = (form, setForm) => {
  let updatedForm = { ...form };

  if (updatedForm.info === '') {
    updatedForm.info = 'NO DESCRIPTION';
  }

  if (/[a-zA-Z]/.test(updatedForm.amount)) {
    updatedForm.amount = '0';
  }

  createTransaction(updatedForm);

  setForm({
    info: '',
    amount: '',
    category: 'need'
  })
};
