import { TimeFrame, BankOveralls, BankBudget, TransactionsList } from '../features/transactions';

export default function Bank() {
  return (
    <div id='bank-container'>
      <TimeFrame />
      <BankOveralls/>
      <BankBudget />
      <TransactionsList />
    </div>
  );
}
