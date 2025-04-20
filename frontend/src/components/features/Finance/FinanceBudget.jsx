export default function FinanceBudget({ Icons, totals, percent }) {
    return (
      <div id="finance-budget" className="budget">
        <h6>Budget</h6>
        <div id="finance-budget-bar">
          <div
            className="budget-bar save"
            style={{
              display: percent.save === 0 ? "none" : "",
              width: percent.save + "%",
            }}
          />
          <div
            className="budget-bar need"
            style={{
              display: percent.need === 0 ? "none" : "",
              width: percent.need + "%",
            }}
          />
          <div
            className="budget-bar sub"
            style={{
              display: percent.sub === 0 ? "none" : "",
              width: percent.sub + "%",
            }}
          />
          <div
            className="budget-bar fun"
            style={{
              display: percent.fun === 0 ? "none" : "",
              width: percent.fun + "%",
            }}
          />
        </div>
        <div id="finance-budget-legend">
          <div className="budget-legend-section header-row">
            <p>Legend</p>
            <p className="budget-legend-right">Amount</p>
          </div>
          <BudgetLegend title="Save" amount={percent.leftover} icon={Icons.save} />
          <BudgetLegend title="Need" amount={totals.need} icon={Icons.need} />
          <BudgetLegend title="Sub" amount={totals.sub} icon={Icons.sub} />
          <BudgetLegend title="Fun" amount={totals.fun} icon={Icons.fun} />
        </div>
      </div>
    );
  }
  
  function BudgetLegend({ title, amount, icon: Icon }) {
    return (
      <div className="budget-legend-section">
        <div className={`budget-legend-left ${title.toLowerCase()}`}>
          <Icon />
          <p>{title}</p>
        </div>
        <p className="budget-legend-right">${ amount ? Number(amount).toLocaleString() : 0}</p>
      </div>
    );
  }