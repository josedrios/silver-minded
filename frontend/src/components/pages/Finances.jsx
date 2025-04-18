import {
  IoLockClosedOutline,
  IoExtensionPuzzleOutline,
  IoCloudyNightOutline,
} from "react-icons/io5";
import { GoFlame } from "react-icons/go";
import { LuTrendingUp } from "react-icons/lu";
import { BsArrowRepeat } from "react-icons/bs";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { useState, useEffect } from "react";

export default function Finances() {
  const Icons = {
    save: IoLockClosedOutline,
    need: IoCloudyNightOutline,
    sub: BsArrowRepeat,
    fun: IoExtensionPuzzleOutline,
    made: LuTrendingUp,
    spent: GoFlame,
  };
  const [responsiveSize, setResponsiveSize] = useState(
    window.innerWidth <= 660
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 660px)");
    const handleChange = (e) => setResponsiveSize(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

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
      <div id="finance-time-frame">
        <div id="finance-increment-frame">
          <button>Y</button>
          <button>M</button>
          <button>W</button>
          <button>A</button>
        </div>
        <div id="finance-current-frame">
          <button className="finance-time-frame-button">
            <FaArrowLeftLong />
          </button>
          <p>September</p>
          <button className="finance-time-frame-button">
            <FaArrowRightLong />
          </button>
        </div>
      </div>
      <div id="finance-stats-container">
        <FinanceGraph />
        <FinanceGraph />
        <div style={{ display: responsiveSize ? "none" : "" }}>
          <FinanceBudget Icons={Icons} />
        </div>
      </div>
      <div
        id="responsive-budget-form"
        style={{ display: responsiveSize ? "" : "none" }}
      >
        <FinanceBudget Icons={Icons} />
        <TransactionsForm Icons={Icons} />
      </div>
      <div id="finance-transactions-container">
        <TransactionsList Icons={Icons} />
        <div style={{ display: responsiveSize ? "none" : "", minWidth: 0}}>
          <TransactionsForm Icons={Icons} />
        </div>
      </div>
    </div>
  );
}

function FinanceCard({ title, amount, icon: Icon }) {
  return (
    <div className="finance-card">
      <div className="finance-card-body">
        <p className="title">{title}</p>
        <p className="amount">
          <span>$</span>
          {amount}
        </p>
      </div>
      <div>
        <Icon />{" "}
      </div>
    </div>
  );
}

function FinanceGraph({ divClass }) {
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

function FinanceBudget({ Icons }) {
  return (
    <div id="finance-budget" className="budget">
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
        <BudgetLegend title="Need" amount="201" icon={Icons.need} />
        <BudgetLegend title="Sub" amount="26" icon={Icons.sub} />
        <BudgetLegend title="Fun" amount="187" icon={Icons.fun} />
      </div>
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
      <p className="budget-legend-right">
        ${amount} <span></span>
      </p>
    </div>
  );
}

function TransactionsList({ Icons }) {
  return (
    <div id="transactions-list">
      <h5>Transactions</h5>
      <TransactionCard
        info="Warfare Movie Ticket"
        amount={16.59}
        category="fun"
        Icons={Icons}
      />
      <TransactionCard
        info="Paycheck"
        amount={321.42}
        category="save"
        Icons={Icons}
      />
      <TransactionCard
        info="Chevron"
        amount={42.15}
        category="need"
        Icons={Icons}
      />
      <TransactionCard
        info="Amazon Prime"
        amount={16.99}
        category="sub"
        Icons={Icons}
      />
    </div>
  );
}

function TransactionCard({ info, time, type, amount, category, Icons }) {
  const Icon = Icons[category];
  return (
    <div className="transaction-card">
      <div className="transaction-card-icon">
        <Icon />
      </div>
      <div className="transaction-card-body">
        <p className="transaction-card-info">{info}</p>
        <p className="transaction-card-time">Jul 20, 6:23 PM</p>
      </div>
      <div className="transaction-card-footer">
        <p className="transaction-card-amount">+${amount}</p>
        <p className="transaction-card-category">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </p>
      </div>
    </div>
  );
}

function TransactionsForm({ Icons }) {
  const Icon1 = Icons.need;
  const Icon2 = Icons.sub;
  const Icon3 = Icons.fun;
  const Icon4 = Icons.save;

  return (
    <form action="" id="transaction-form">
      <h6>Create Transaction</h6>
      <input
        type="text"
        name=""
        placeholder="Info"
        className="standard-input"
        id="transaction-form-info"
      />
      <div className="transaction-form-row">
        <input
          type="date"
          className="standard-input"
          id="transaction-form-date"
        />
        <div id="finance-form-payment-type">
          <button>D</button>
          <button>C</button>
          <div id="finance-form-payment-slider" />
        </div>
      </div>
      <div className="transaction-form-row">
        <input
          type="text"
          name=""
          placeholder="$2000"
          className="standard-input"
          id="transaction-form-amount"
        />
        {/* category buttons */}
        <div id="category-buttons">
          <button>
            <Icon1 />
          </button>
          <button>
            <Icon2 />
          </button>
          <button>
            <Icon3 />
          </button>
          <button>
            <Icon4 />
          </button>
        </div>
      </div>

      <button id="finance-form-submit" className="standard-btn">
        Submit
      </button>
    </form>
  );
}
