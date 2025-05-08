import { Button, PlusIcon } from "../../../components";

export default function TransactionsList({ transactionModal, setTransactionModal}) {
  return (
    <div className="transactions-list">
      <div className="transaction-list-header"> 
        <h4>Transactions</h4>
        <Button variant="gray" squared={true} onClick={() => setTransactionModal(true)}>
            <PlusIcon />
        </Button>
      </div>
      <div className="transactions-body">
        <TransactionCard />
      </div>
    </div>
  );
}

function TransactionCard() {
  return (
    <button className="transaction-card">
      <div className="card-row">
        <p className="transaction-info">Small Donation</p>
        <p className="transaction-amount">+$9,000</p>
      </div>
      <div className="card-row">
        <span className="branch">└─</span>
        <p className="transaction-date">12 MAY 2025, 23:57</p>
        <p className="transaction-category">/FUN</p>
      </div>
    </button>
  );
}
