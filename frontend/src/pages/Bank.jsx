import { TimeFrame, BankOveralls, BankBudget } from '../features/transactions';

export default function Bank() {
  return (
    <div id='bank-container'>
      <TimeFrame />
      <BankOveralls/>
      <BankBudget />
    </div>
  );
}
