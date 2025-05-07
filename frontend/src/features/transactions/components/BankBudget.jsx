import { Icon, WalletIcon } from '../../../components';

export default function BankBudget() {
  return (
    <div className="bank-budget">
      <div className="budget-row budget-header">
        <Icon variant="gray">
          <WalletIcon />
        </Icon>
        <p>Budget</p>
      </div>
      <div className="budget-row budget-data-bar">
        <div className="data-bar-category primary" />
        <div className="data-bar-category accent" />
        <div className="data-bar-category error" />
        <div className="data-bar-category gray" />
      </div>
      <div className="budget-row color-legend">
        <div className="color-legend-row">
          <p>Save</p>
          <div className="primary color-block" />
        </div>
        <div className="color-legend-row">
          <p>Need</p>
          <div className="accent color-block" />
        </div>
        <div className="color-legend-row">
          <p>Fun</p>
          <div className="error color-block" />
        </div>
        <div className="color-legend-row">
          <p>Sub</p>
          <div className="gray color-block" />
        </div>
      </div>
    </div>
  );
}
