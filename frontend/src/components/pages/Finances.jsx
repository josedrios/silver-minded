import {
  IoLockClosedOutline,
  IoExtensionPuzzleOutline,
  IoCloudyNightOutline,
} from "react-icons/io5";
import { GoFlame } from "react-icons/go";
import { LuTrendingUp } from "react-icons/lu";
import { BsArrowRepeat } from "react-icons/bs";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { useState, useEffect, useContext, useMemo } from "react";
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

  const totals = useMemo(() => {
    return transactions.reduce((acc, tran) => {
      const { category, amount } = tran;
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {});
  }, [transactions]);

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

  const percent = useMemo(() => {
    const income = totals.save || 0;
    const expenses = (totals.need || 0) + (totals.sub || 0) + (totals.fun || 0);
    const leftover = income - expenses;
    const total = income > expenses ? income : expenses;

    if (total === 0) return { need: 0, sub: 0, fun: 0, save: 0 };

    return {
      need: ((totals.need || 0) / total) * 100,
      sub: ((totals.sub || 0) / total) * 100,
      fun: ((totals.fun || 0) / total) * 100,
      save: leftover > 0 ? (leftover / total) * 100 : 0,
      leftover: leftover > 0 ? leftover : 0
    };
  }, [totals]);

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
          <FinanceBudget Icons={Icons} totals={totals} percent={percent} />
        </div>
      </div>
      <div
        id="responsive-budget-form"
        style={{ display: responsiveSize ? "" : "none" }}
      >
        <FinanceBudget Icons={Icons} totals={totals} percent={percent} />
        <TransactionsForm
          Icons={Icons}
          transactionForm={transactionForm}
          setTransactionForm={setTransactionForm}
          loadTransactions={loadTransactions}
          financeTimeFrame={financeTimeFrame}
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

function FinanceBudget({ Icons, totals, percent }) {
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
      <p className="budget-legend-right">${Number(amount).toLocaleString()}</p>
    </div>
  );
}

function TransactionsList({ Icons, transactions }) {
  return (
    <div id="transactions-list">
      <h5>Transactions</h5>
      {transactions.map((tran, key) => (
        <TransactionCard transaction={tran} Icons={Icons} key={key} />
      ))}
    </div>
  );
}

function TransactionCard({ transaction, Icons }) {
  const Icon = Icons[transaction.category];
  return (
    <div className="transaction-card">
      <div className={`transaction-card-icon ${transaction.category}`}>
        <Icon />
      </div>
      <div className="transaction-card-body">
        <p className="transaction-card-info">{transaction.info}</p>
        <p className="transaction-card-time">
          {new Date(transaction.paidAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}{" "}
          {new Date(transaction.paidAt).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
      </div>
      <div className="transaction-card-footer">
        <p className="transaction-card-amount">
          {transaction.category === "save" ? "+" : ""}$
          {Number(transaction.amount).toLocaleString()}
        </p>
        <p className="transaction-card-category">
          {transaction.category.charAt(0).toUpperCase() +
            transaction.category.slice(1)}
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
      onSubmit={async (e) => {
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
      <h6>Transaction Form</h6>
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
