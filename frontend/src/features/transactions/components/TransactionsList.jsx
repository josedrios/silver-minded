import { Button, PlusIcon } from '../../../components';
import { formatTransactionDate } from '../';

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
        <h4>Transactions</h4>
        <Button
          variant="gray"
          squared={true}
          onClick={() => setTransactionModal(true)}
        >
          <PlusIcon />
        </Button>
      </div>
      <div className="transactions-body">
        {transactions.transactions.map((transaction, i) => (
          <TransactionCard
            transaction={transaction}
            selectedTransaction={selectedTransaction}
            setSelectedTransaction={setSelectedTransaction}
          />
        ))}

        {}
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
        <p className="transaction-amount">${transaction.amount}</p>
      </div>
      <div className="card-row">
        <span className="branch">└─</span>
        {/* <p className="transaction-date">12 MAY 2025, 23:57</p> */}
        <p className="transaction-date">
          {formatTransactionDate(transaction.createdAt)}
        </p>
        <p className="transaction-category">
          /{transaction.category.toUpperCase()}
        </p>
      </div>
    </button>
  );
}
