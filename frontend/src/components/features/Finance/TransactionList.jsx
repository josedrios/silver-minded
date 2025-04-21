export default function TransactionsList({ Icons, transactions }) {
    return (
      <div id="transactions-list">
        <h5>Transactions</h5>
        {transactions.map((tran, key) => (
          <TransactionCard transaction={tran} Icons={Icons} key={key} />
        ))}
      </div>
    );
  }
  
  function TransactionCard({ transaction, Icons }) {
    const Icon = Icons[transaction.category];
    return (
      <div className="transaction-card">
        <div className={`transaction-card-icon ${transaction.category}`}>
          <Icon />
        </div>
        <div className="transaction-card-body">
          <p className="transaction-card-info">{transaction.info}</p>
          <p className="transaction-card-time">
            {new Date(transaction.paidAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}{" "}
            {new Date(transaction.paidAt).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })} - {transaction.card === 'debit' ? 'D' : 'C'}
          </p>
        </div>
        <div className="transaction-card-footer">
          <p className="transaction-card-amount">
            {transaction.category === "save" ? "+" : ""}$
            {Number(transaction.amount).toLocaleString()}
          </p>
          <p className="transaction-card-category">
            {transaction.category.charAt(0).toUpperCase() +
              transaction.category.slice(1)}
          </p>
        </div>
      </div>
    );
  }