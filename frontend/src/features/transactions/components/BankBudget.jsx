import { useMemo } from 'react';
import { Icon, WalletIcon } from '../../../components';

export default function BankBudget({ bankStats }) {
  const denominator = useMemo(() => {
    return bankStats.made > bankStats.spent ? bankStats.made : bankStats.spent;
  }, [bankStats.made, bankStats.spent]);
  console.log(denominator);

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
          title={`${bankStats.saved < 0 ? '-' : ''}$${Math.abs(
            bankStats.saved
          )}`}
          style={{
            width: `${(bankStats.saved / denominator) * 100}%`,
            display: bankStats.saved <= 0 ? 'none' : '',
          }}
        />
        <div
          className="data-bar-category accent"
          title={`$${bankStats.need}`}
          style={{
            width: `${(bankStats.need / denominator) * 100}%`,
            display: bankStats.need === 0 ? 'none' : '',
          }}
        />
        <div
          className="data-bar-category error"
          title={`$${bankStats.fun}`}
          style={{
            width: `${(bankStats.fun / denominator) * 100}%`,
            display: bankStats.fun === 0 ? 'none' : '',
          }}
        />
        <div
          className="data-bar-category gray"
          title={`$${bankStats.sub}`}
          style={{
            width: `${(bankStats.sub / denominator) * 100}%`,
            display: bankStats.sub === 0 ? 'none' : '',
          }}
        />
      </div>
      <div className="budget-row color-legend">
        <div
          className="color-legend-row"
          title={`${bankStats.saved < 0 ? '-' : ''}$${Math.abs(
            bankStats.saved
          )}`}
        >
          <p>Save</p>
          <div className="primary color-block" />
        </div>
        <div className="color-legend-row" title={`$${bankStats.need}`}>
          <p>Need</p>
          <div className="accent color-block" />
        </div>
        <div className="color-legend-row" title={`$${bankStats.fun}`}>
          <p>Fun</p>
          <div className="error color-block" />
        </div>
        <div className="color-legend-row" title={`$${bankStats.sub}`}>
          <p>Sub</p>
          <div className="gray color-block" />
        </div>
      </div>
    </div>
  );
}
