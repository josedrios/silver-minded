import { useState, useEffect } from 'react';
import { Modal } from '../components';
import {
  TimeFrame,
  BankOveralls,
  BankBudget,
  TransactionsList,
  TransactionForm,
} from '../features/transactions';

export default function Bank() {
  const [transactionModal, setTransactionModal] = useState(false);

  const [transactionForm, setTransactionForm] = useState({
    info: '',
    amount: '',
    category: 'need'
  })

  useEffect(() => {
    console.log(transactionForm)
  }, [transactionForm])

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
