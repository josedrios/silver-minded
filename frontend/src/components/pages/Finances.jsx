import {
  IoGlassesOutline,
  IoLockClosedOutline,
  IoExtensionPuzzleOutline,
} from "react-icons/io5";
import { MdOutlinePropaneTank } from "react-icons/md";
import { GoFlame } from "react-icons/go";
import { LuTrendingUp } from "react-icons/lu";
import { BsArrowRepeat } from "react-icons/bs";

export default function Finances() {
  const Icons = {
    save: IoLockClosedOutline,
    tp: IoGlassesOutline,
    gas: MdOutlinePropaneTank,
    subs: BsArrowRepeat,
    fun: IoExtensionPuzzleOutline,
    made: LuTrendingUp,
    spent: GoFlame,
  };

  return (
    <div id="finances-container">
      <div id="finance-cards-container">
        <FinanceCard title={"Total Made"} amount={"41,064"} icon={Icons.made} />
        <FinanceCard
          title={"Total Saved"}
          amount={"20,137"}
          icon={Icons.save}
        />
        <FinanceCard
          title={"Total Spent"}
          amount={"6,563"}
          icon={Icons.spent}
        />
      </div>
      <div id="finance-stats-container">
        <FinanceGraph />
        <FinanceBudget Icons={Icons} />
      </div>
      <div id="finance-transactions-container">
        <TransactionsList />
        <TransactionsForm />
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
  return (
    <div id="finance-graph">
      <div id="finance-graph-x"></div>
      <div id="finance-graph-right">
        <div id="finance-graph-body"></div>
        <div id="finance-graph-y"></div>
      </div>
    </div>
  );
}

function FinanceBudget({ Icons }) {
  return (
    <div id="finance-budget">
      <div id="finance-budget-bar">
        <div className="budget-bar" />
        <div className="budget-bar" />
        <div className="budget-bar" />
        <div className="budget-bar" />
        <div className="budget-bar" />
      </div>
      <div id="finance-budget-legend">
        <div className="budget-legend-section header-row">
          <p>Legend</p>
          <p className="budget-legend-right">Amount</p>
        </div>
        <BudgetLegend title="Save" amount="2,137" icon={Icons.save} />
        <BudgetLegend title="TP" amount="201" icon={Icons.tp} />
        <BudgetLegend title="Gas" amount="41" icon={Icons.gas} />
        <BudgetLegend title="Subs" amount="26" icon={Icons.subs} />
        <BudgetLegend title="Fun" amount="187" icon={Icons.fun} />
      </div>
      {/* list of budget */}
    </div>
  );
}

function BudgetLegend({ title, amount, icon: Icon }) {
  return (
    <div className="budget-legend-section">
      <div className="budget-legend-left">
        <Icon />
        <p>{title}</p>
      </div>
      <p className="budget-legend-right">${amount}</p>
    </div>
  );
}

function TransactionsList() {
  return (
    <div id="transactions-list">
      <h5>Transactions</h5>
      <TransactionRow />
    </div>
  );
}

function TransactionRow({}) {
  return (
    <div className="transaction-row">
      <div className="transaction-row-icon">
        <IoGlassesOutline />
      </div>
      <div>
        <p className="transaction-row-info">Toothpaste, Toothbrush and floss</p>
        <p className="transaction-row-time">Jul 20, 6:23 PM</p>
      </div>
      <div>
        <p className="transaction-row-amount">$24.50</p>
        <p className="transaction-row-category">TP</p>
      </div>
    </div>
  );
}

function TransactionsForm() {
  return <div id="transaction-form">Transactions Form</div>;
}
