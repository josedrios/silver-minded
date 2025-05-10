import { useState, useEffect, useContext, useMemo } from 'react';
import { Modal } from '../components';
import { AppContext } from '../context/AppContext';
import {
  TimeFrame,
  BankOveralls,
  BankBudget,
  TransactionsList,
  TransactionForm,
  fetchAndUpdateTransactions,
  selectedToForm,
} from '../features/transactions';

export default function Bank() {
  const { transactions, setTransactions } = useContext(AppContext);
  const [transactionModal, setTransactionModal] = useState(false);
  const [transactionForm, setTransactionForm] = useState({
    info: '',
    amount: '',
    category: 'need',
  });
  const [selectedTransaction, setSelectedTransaction] = useState('');

  useEffect(() => {
    fetchAndUpdateTransactions(transactions, setTransactions);
  }, [transactions.month, transactions.year]);

  useEffect(() => {
    if (!transactionModal) {
      setSelectedTransaction('');
      setTransactionForm({
        info: '',
        amount: '',
        category: 'need',
      });
    }
  }, [transactionModal]);

  useEffect(() => {
    if (selectedTransaction !== '') {
      setTransactionForm(selectedToForm(selectedTransaction));
      setTransactionModal(true);
    }
  }, [selectedTransaction]);

  const bankStats = useMemo(() => {
    const result = { save: 0, fun: 0, sub: 0, need: 0 };
    transactions.transactions.forEach((curr) => {
      if (result.hasOwnProperty(curr.category)) {
        result[curr.category] += curr.amount;
      }
    });
    return {
      made:
        result.save === 0 ? result.fun + result.need + result.sub : result.save,
      spent: result.fun + result.need + result.sub,
      saved: result.save - (result.fun + result.need + result.sub),
      need: result.need,
      fun: result.fun,
      sub: result.sub,
    };
  }, [transactions.transactions]);

  return (
    <div id="bank-container">
      <TimeFrame />
      <div className="bank-budget-overall-wrapper">
        <BankOveralls transactions={transactions} bankStats={bankStats} />
        <BankBudget bankStats={bankStats} />
      </div>
      <TransactionsList
        transactions={transactions}
        setTransactions={setTransactions}
        transactionModal={transactionModal}
        setTransactionModal={setTransactionModal}
        selectedTransaction={selectedTransaction}
        setSelectedTransaction={setSelectedTransaction}
      />
      <Modal
        isOpen={transactionModal}
        onClose={() => setTransactionModal(false)}
      >
        <TransactionForm
          transactionForm={transactionForm}
          setTransactionForm={setTransactionForm}
          transactions={transactions}
          setTransactions={setTransactions}
          selectedTransaction={selectedTransaction}
          setSelectedTransaction={setSelectedTransaction}
          setTransactionModal={setTransactionModal}
        />
      </Modal>
    </div>
  );
}
