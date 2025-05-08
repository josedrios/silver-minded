import { useMemo } from 'react';
import { TerminalBox } from '../../../components';

export default function BankOveralls({bankStats}) {
  
  return (
    <TerminalBox
      title="5.2025 STATS"
      className="bank-overalls"
      variant="primary"
    >
      <div className="bank-overalls-body">
        <p className="overall-header">~/2025/MAY/:</p>
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
