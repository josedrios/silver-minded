import {
  IoLockClosedOutline,
  IoExtensionPuzzleOutline,
  IoCloudyNightOutline,
} from "react-icons/io5";
import { GoFlame } from "react-icons/go";
import { LuTrendingUp } from "react-icons/lu";
import { BsArrowRepeat } from "react-icons/bs";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { useState, useEffect, useContext } from "react";
import {
  createTransaction,
  fetchTransactions,
} from "../../util/transactionUtil";
import { AppContext } from "../../util/AppContext";

export default function Finances() {
  const { transactions, setTransactions } = useContext(AppContext);

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
  const now = new Date();
  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}T${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

  const [transactionForm, setTransactionForm] = useState({
    info: "",
    paidAt: formatDate(now),
    type: "debit",
    amount: "",
    category: "need",
  });
  useEffect(() => {
    console.log(transactionForm);
  }, [transactionForm]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 660px)");
    const handleChange = (e) => setResponsiveSize(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const loadTransactions = async (financeTimeFrame) => {
    const data = await fetchTransactions(
      financeTimeFrame.year,
      financeTimeFrame.month
    );
    setTransactions(data);
  };

  const [financeTimeFrame, setFinanceTimeFrame] = useState({
    year: now.getFullYear(),
    month: now.getMonth(),
  });

  useEffect(() => {
    loadTransactions(financeTimeFrame);
  }, []);

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

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
        <TransactionsForm
          Icons={Icons}
          transactionForm={transactionForm}
          setTransactionForm={setTransactionForm}
        />
      </div>
      <div id="finance-transactions-container">
        <TransactionsList Icons={Icons} transactions={transactions} />
        <div style={{ display: responsiveSize ? "none" : "", minWidth: 0 }}>
          <TransactionsForm
            Icons={Icons}
            transactionForm={transactionForm}
            setTransactionForm={setTransactionForm}
            loadTransactions={loadTransactions}
            financeTimeFrame={financeTimeFrame}
          />
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

function TransactionsList({ Icons, transactions }) {
  return (
    <div id="transactions-list">
      <h5>Transactions</h5>
      {transactions.map((tran, key) => (
        <TransactionCard
          info={tran.info}
          amount={tran.amount}
          category={tran.category}
          Icons={Icons}
          key={key}
        />
      ))}
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

function TransactionsForm({
  Icons,
  transactionForm,
  setTransactionForm,
  loadTransactions,
  financeTimeFrame,
}) {
  const now = new Date();
  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}T${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

  const categoryIcons = {
    need: Icons.need,
    sub: Icons.sub,
    fun: Icons.fun,
    save: Icons.save,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      action=""
      id="transaction-form"
      onSubmit={async(e) => {
        e.preventDefault();
        await createTransaction(transactionForm);
        setTransactionForm({
          info: "",
          paidAt: formatDate(now),
          type: "debit",
          amount: "",
          category: "need",
        });
        loadTransactions(financeTimeFrame);
      }}
    >
      <h6>Create Transaction</h6>
      <input
        type="text"
        name="info"
        placeholder="Info"
        className="standard-input"
        id="transaction-form-info"
        autoComplete="off"
        value={transactionForm.info}
        onChange={handleChange}
      />
      <div className="transaction-form-row">
        <input
          type="datetime-local"
          className="standard-input"
          id="transaction-form-date"
          name="paidAt"
          autoComplete="off"
          value={transactionForm.paidAt}
          onChange={handleChange}
        />
        <div id="finance-form-payment-type">
          <button
            type="button"
            className={transactionForm.type === "debit" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setTransactionForm((prev) => ({ ...prev, type: "debit" }));
            }}
          >
            D
          </button>
          <button
            type="button"
            className={transactionForm.type === "credit" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setTransactionForm((prev) => ({ ...prev, type: "credit" }));
            }}
          >
            C
          </button>
          <div id="finance-form-payment-slider" />
        </div>
      </div>
      <div className="transaction-form-row">
        <input
          type="text"
          inputMode="decimal"
          placeholder="$"
          className="standard-input"
          id="transaction-form-amount"
          name="amount"
          value={transactionForm.amount}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*\.?\d{0,2}$/.test(val) || val === "") {
              handleChange(e);
            }
          }}
        />
        <div id="category-buttons">
          {Object.entries(categoryIcons).map(([key, Icon]) => (
            <button
              key={key}
              type="button"
              className={`finance-form-category-button ${key} ${
                transactionForm.category === key ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setTransactionForm((prev) => ({ ...prev, category: key }));
              }}
            >
              <Icon />
            </button>
          ))}
        </div>
      </div>

      <button id="finance-form-submit" className="standard-btn" type="submit">
        Submit
      </button>
    </form>
  );
}
