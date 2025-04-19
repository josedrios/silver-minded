export default function FinanceGraph({ divClass }) {
    return (
      <div id="finance-graph">
        <div id="finance-graph-x">
          <FinanceGraphX value={30} />
          <FinanceGraphX value={20} />
          <FinanceGraphX value={10} />
        </div>
        <div id="finance-graph-right">
          <div id="finance-graph-body">
            <FinanceGraphBar />
            <FinanceGraphBar />
            <FinanceGraphBar />
          </div>
          <div id="finance-graph-y">
            <FinanceGraphY label={"Made"} />
            <FinanceGraphY label={"Saved"} />
            <FinanceGraphY label={"Spent"} />
          </div>
        </div>
      </div>
    );
  }

  function FinanceGraphBar() {
    return <div className="finance-graph-bar" />;
  }
  
  function FinanceGraphX({ value }) {
    return (
      <div className="increment">
        <p className="increment-title">${value}k</p>
        <div className="increment-notch" />
      </div>
    );
  }
  
  function FinanceGraphY({ label }) {
    return (
      <div className="increment">
        <p className="increment-title">{label}</p>
        <div className="increment-notch" />
      </div>
    );
  }