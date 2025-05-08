import { createTransaction, fetchAndUpdateTransactions } from '../';

export const formValidation = (form, setForm, transactions, setTransactions) => {
  let updatedForm = { ...form };

  if (updatedForm.info === '') {
    updatedForm.info = 'NO DESCRIPTION';
  }

  if(updatedForm.amount === '') {
    updatedForm.amount = '0'
  }

  if (/[a-zA-Z]/.test(updatedForm.amount)) {
    updatedForm.amount = '0';
  }

  createTransaction(updatedForm);

  fetchAndUpdateTransactions(transactions, setTransactions);

  setForm({
    info: '',
    amount: '',
    category: 'need'
  })
};
