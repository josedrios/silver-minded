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
} from '../features/transactions';

export default function Bank() {
  const { transactions, setTransactions } = useContext(AppContext);
  const [transactionModal, setTransactionModal] = useState(false);

  const [transactionForm, setTransactionForm] = useState({
    info: '',
    amount: '',
    category: 'need',
  });

  useEffect(() => {
    console.log(transactionForm);
  }, [transactionForm]);

  useEffect(() => {
    fetchAndUpdateTransactions(transactions, setTransactions);
  }, [transactions.month, transactions.year]);

  const bankStats = useMemo(() => {
      const result = { save: 0, fun: 0, sub: 0, need: 0}
      transactions.transactions.forEach(curr => {
        if(result.hasOwnProperty(curr.category)) {
          result[curr.category] += curr.amount;
        }
      });
      return {
        made: result.save,
        spent: result.fun + result.need + result.sub,
        saved: result.save - (result.fun + result.need + result.sub),
        need: result.need,
        fun: result.fun,
        sub: result.sub
      };
    },[transactions.transactions])

  return (
    <div id="bank-container">
      <TimeFrame />
      <BankOveralls bankStats={bankStats}/>
      <BankBudget bankStats={bankStats}/>
      <TransactionsList
        transactions={transactions}
        setTransactions={setTransactions}
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
          transactions={transactions}
          setTransactions={setTransactions}
        />
      </Modal>
    </div>
  );
}
