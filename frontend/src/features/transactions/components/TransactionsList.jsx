import { Button, PlusIcon } from '../../../components';
import { formateCustomDate } from '../';
import { today } from '../../events';

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
      <div className="transactions-body">
        {transactions.transactions.length !== 0 ? (
          transactions.transactions.map((transaction, i) => (
            <TransactionCard
              transaction={transaction}
              selectedTransaction={selectedTransaction}
              setSelectedTransaction={setSelectedTransaction}
            />
          ))
        ) : (
          <p className="empty-list-quote">No transactions</p>
        )}
      </div>
    </div>
  );
}

function TransactionCard({
  transaction,
  selectedTransaction,
  setSelectedTransaction,
}) {
  return (
    <button
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
    </button>
  );
}
