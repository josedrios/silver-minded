export default function BankOveralls({ transactions, bankStats }) {
  return (
    <div className="bank-overalls">
      <p className="overall-header">TOTAL:</p>
      <div className="overall-row">
        <p>MADE:</p>
        <span>${bankStats.made.toFixed(2)}</span>
      </div>
      <div className="overall-row">
        <p>SPENT:</p> <span>${bankStats.spent.toFixed(2)}</span>
      </div>
      <div className="overall-row">
        <p>SAVED:</p>{' '}
        <span className={bankStats.saved < 0 ? 'negative-amount' : ''}>
          {bankStats.saved < 0 ? '-' : ''}${Math.abs(bankStats.saved).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
