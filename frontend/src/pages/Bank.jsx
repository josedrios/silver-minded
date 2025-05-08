import { useState, useEffect, useContext } from 'react';
import { Modal } from '../components';
import { AppContext } from '../context/AppContext';
import {
  TimeFrame,
  BankOveralls,
  BankBudget,
  TransactionsList,
  TransactionForm,
  fetchAndUpdateTransactions
} from '../features/transactions';

export default function Bank() {
  const{ transactions, setTransactions } = useContext(AppContext);
  const [transactionModal, setTransactionModal] = useState(false);

  const [transactionForm, setTransactionForm] = useState({
    info: '',
    amount: '',
    category: 'need'
  })

  useEffect(() => {
    console.log(transactionForm)
  }, [transactionForm])

  useEffect(() => {
    fetchAndUpdateTransactions(transactions, setTransactions);
  }, [transactions.month, transactions.year])

  return (
    <div id="bank-container">
      <TimeFrame />
      <BankOveralls />
      <BankBudget />
      <TransactionsList
        transactionModal={transactionModal}
        setTransactionModal={setTransactionModal}
      />
      <Modal
        isOpen={transactionModal}
        onClose={() => setTransactionModal(false)}
      >
        <TransactionForm 
          transactionForm={transactionForm}
          setTransactionForm={setTransactionForm}
        />
      </Modal>
    </div>
  );
}
