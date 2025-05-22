import { Button, PlusIcon } from '../../../components';
import { formateCustomDate } from '../';
import { today } from '../../events';
import { motion, AnimatePresence } from 'motion/react';

const list = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { type: 'tween', duration: 0.3 } },
};

export default function TransactionsList({
  transactionModal,
  setTransactionModal,
  transactions,
  setTransactions,
  selectedTransaction,
  setSelectedTransaction,
}) {
  return (
    <div className="transactions-list">
      <div className="transaction-list-header">
        <h4>Transactions:</h4>
        {transactions.month === today.getMonth() ? (
          <Button
            variant="gray"
            squared={true}
            onClick={() => setTransactionModal(true)}
          >
            <PlusIcon />
          </Button>
        ) : (
          ''
        )}
      </div>
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={list}
          className="transactions-body"
        >
          {transactions.transactions.length !== 0 ? (
            transactions.transactions.map((transaction) => (
              <TransactionCard
                transaction={transaction}
                key={transaction._id}
                selectedTransaction={selectedTransaction}
                setSelectedTransaction={setSelectedTransaction}
              />
            ))
          ) : (
            <p className="empty-list-quote">No transactions</p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function TransactionCard({
  transaction,
  selectedTransaction,
  setSelectedTransaction,
}) {
  return (
    <motion.button
      layout
      variants={item}
      exit={{ opacity: 0, y: 20 }}
      className={`transaction-card ${
        selectedTransaction._id === transaction._id ? 'selected' : ''
      }`}
      onClick={() => {
        if (selectedTransaction._id === transaction._id) {
          setSelectedTransaction('');
        } else {
          setSelectedTransaction(transaction);
        }
      }}
    >
      <div className="card-row">
        <p className="transaction-info">{transaction.info}</p>
        <p
          className={`transaction-amount ${
            transaction.category !== 'save' ? 'negative-amount' : ''
          }`}
        >
          {transaction.category !== 'save' ? '-' : ''}${transaction.amount}
        </p>
      </div>
      <div className="card-row">
        <span className="branch">└─</span>
        <p className="transaction-date">
          {formateCustomDate(transaction.createdAt)}
        </p>
        <p className="transaction-category">
          /{transaction.category.toUpperCase()}
        </p>
      </div>
    </motion.button>
  );
}
