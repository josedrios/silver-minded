import { useMemo } from 'react';
import { TerminalBox } from '../../../components';
import { getMonthName } from '../../events';

export default function BankOveralls({transactions, bankStats}) {
  
  return (
    <TerminalBox
      // title="5.2025 STATS"
      title={`${transactions.month+1}.${transactions.year} STATS`}
      className="bank-overalls"
      variant="primary"
    >
      <div className="bank-overalls-body">
        <p className="overall-header">~/{transactions.year}/{getMonthName(transactions.month).toUpperCase()}/:</p>
        <div className="overall-row">
          <p>MADE:</p> 
          <span>${bankStats.made}</span>
        </div>
        <div className="overall-row">
          <p>SPENT:</p> <span>${bankStats.spent}</span>
        </div>
        <div className="overall-row">
          <p>SAVED:</p> <span>${bankStats.saved}</span>
        </div>
      </div>
    </TerminalBox>
  );
}
