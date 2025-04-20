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
  fetchFinanceOveralls,
  fetchTransactions,
} from "../../util/transactionUtil";
import { AppContext } from "../../util/AppContext";
import FinanceGraph from "../features/Finance/FinanceGraph";
import FinanceBudget from "../features/Finance/FinanceBudget";
import TransactionsList from "../features/Finance/TransactionList";
import TransactionsForm from "../features/Finance/TransactionForm";

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

  const [financeOveralls, setFinanceOveralls] = useState([]);

  const loadTransactions = async (financeTimeFrame) => {
    const stats = await fetchFinanceOveralls();
    const data = await fetchTransactions(
      financeTimeFrame.year,
      financeTimeFrame.month
    );
    setFinanceOveralls(stats)
    setTransactions(data);
  };

  const [financeTimeFrame, setFinanceTimeFrame] = useState({
    year: now.getFullYear(),
    month: now.getMonth(),
  });

  useEffect(() => {
    loadTransactions(financeTimeFrame);
  }, []);


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

  const budgetGraphData = useMemo(() => {
    return [
      { title: 'save', value: percent.leftover || 0},
      { title: 'need', value: totals.need || 0},
      { title: 'fun', value: totals.fun || 0},
      { title: 'sub', value: totals.sub || 0},
    ]
  })

  const overallsGraphData = useMemo(() => {
    return [
      { title: 'made', value: financeOveralls.totalMade},
      { title: 'saved', value: (Math.max(0, (financeOveralls.totalMade - financeOveralls.totalSpent))).toFixed(2) },
      { title: 'spent', value: financeOveralls.totalSpent},
    ]
  })

  return (
    <div id="finances-container">
      <div id="finance-cards-container">
        <FinanceCard title={"Total Made"} amount={financeOveralls.totalMade} icon={Icons.made} />
        <FinanceCard
          title={"Total Saved"}
          amount={(financeOveralls.totalMade - financeOveralls.totalSpent).toFixed(2)}
          icon={Icons.save}
        />
        <FinanceCard
          title={"Total Spent"}
          amount={financeOveralls.totalSpent}
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
        <FinanceGraph data={overallsGraphData}/>
        <FinanceGraph data={budgetGraphData}/>
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