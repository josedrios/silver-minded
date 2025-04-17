import { TbPigMoney, TbMoneybag, TbFlame } from "react-icons/tb";

export default function Finances() {
  return (
    <div id="finances-container">
      <div id="finance-cards-container">
        <FinanceCard title={"Total Made"} amount={"41,064"} icon={TbMoneybag} />
        <FinanceCard
          title={"Total Saved"}
          amount={"20,137"}
          icon={TbPigMoney}
        />
        <FinanceCard title={"Total Spent"} amount={"6,563"} icon={TbFlame} />
      </div>
      <div id="finance-stats-container">
        <FinanceGraph />
        <FinanceBudget />
      </div>
    </div>
  );
}

function FinanceCard({ title, amount, icon: Icon }) {
  return (
    <div className="finance-card">
      <div>
        <p className="title">{title}</p>
        <p className="amount">
          <span>$</span>
          {amount}
        </p>
      </div>
      <div>
        {" "}
        <Icon />{" "}
      </div>
    </div>
  );
}

function FinanceGraph() {
  return <div id="finance-graph">
    <div id="finance-graph-x">

    </div>
    <div id="finance-graph-right">
        <div id="finance-graph-body">
            
        </div>
        <div id="finance-graph-y">

        </div>
    </div>
  </div>;
}

function FinanceBudget() {
  return <div id="finance-budget">budget</div>;
}
