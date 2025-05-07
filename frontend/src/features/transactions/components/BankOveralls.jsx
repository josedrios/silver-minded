import { TerminalBox } from '../../../components';

export default function BankOveralls() {
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
          <span>$136</span>
        </div>
        <div className="overall-row">
          <p>SPENT:</p> <span>$21</span>
        </div>
        <div className="overall-row">
          <p>SAVED:</p> <span>$118</span>
        </div>
      </div>
    </TerminalBox>
  );
}
