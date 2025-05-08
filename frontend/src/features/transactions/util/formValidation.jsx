import { createTransaction, fetchAndUpdateTransactions, editTransaction } from '../';

export const formValidation = async (form, setForm, transactions, setTransactions, selectedTransaction, setSelectedTransaction) => {
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

  if(selectedTransaction === '') {
    await createTransaction(updatedForm);
  } else {
    await editTransaction(updatedForm, selectedTransaction._id);
    setSelectedTransaction('');
  }
  
  await fetchAndUpdateTransactions(transactions, setTransactions);
  
  setForm({
    info: '',
    amount: '',
    category: 'need'
  })
};
