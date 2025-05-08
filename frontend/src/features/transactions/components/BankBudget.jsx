import { Icon, WalletIcon } from '../../../components';

export default function BankBudget({ bankStats }) {
  return (
    <div className="bank-budget">
      <div className="budget-row budget-header">
        <Icon variant="gray">
          <WalletIcon />
        </Icon>
        <p>Budget</p>
      </div>
      <div className="budget-row budget-data-bar">
        <div
          className="data-bar-category primary"
          style={{ width: `${(bankStats.saved / bankStats.made) * 100}%`, display: bankStats.saved <= 0 ? 'none' : ''}}
        />
        <div
          className="data-bar-category accent"
          style={{ width: `${(bankStats.need / bankStats.made) * 100}%`, display: bankStats.need === 0 ? 'none' : ''}}
        />
        <div
          className="data-bar-category error"
          style={{ width: `${(bankStats.fun / bankStats.made) * 100}%`, display: bankStats.fun === 0 ? 'none' : ''}}
        />
        <div
          className="data-bar-category gray"
          style={{ width: `${(bankStats.sub / bankStats.made) * 100}%`, display: bankStats.sub === 0 ? 'none' : ''}}
        />
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
