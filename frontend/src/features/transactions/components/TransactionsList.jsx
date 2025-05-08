import { Button, PlusIcon } from "../../../components";

export default function TransactionsList({ transactionModal, setTransactionModal, transactions, setTransactions}) {
  return (
    <div className="transactions-list">
      <div className="transaction-list-header"> 
        <h4>Transactions</h4>
        <Button variant="gray" squared={true} onClick={() => setTransactionModal(true)}>
            <PlusIcon />
        </Button>
      </div>
      <div className="transactions-body">
        {transactions.transactions.map((transaction, i) => (
          <TransactionCard transaction={transaction}/>
        ))}

        {}
      </div>
    </div>
  );
}

function TransactionCard({transaction}) {
  return (
    <button className="transaction-card">
      <div className="card-row">
        <p className="transaction-info">{transaction.info}</p>
        <p className="transaction-amount">${transaction.amount}</p>
      </div>
      <div className="card-row">
        <span className="branch">└─</span>
        {/* <p className="transaction-date">12 MAY 2025, 23:57</p> */}
        <p className="transaction-date">{transaction.createdAt}</p>
        <p className="transaction-category">/{transaction.category.toUpperCase()}</p>
      </div>
    </button>
  );
}
