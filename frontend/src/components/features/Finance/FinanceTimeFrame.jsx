import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function FinanceTimeFrame({
  financeTimeFrame,
  setFinanceTimeFrame,
}) {

    const incrementMonth = (type) => {
        setFinanceTimeFrame((prev) => {
          const newMonth =
            type === "decrease"
              ? prev.month === 0
                ? 11
                : prev.month - 1
              : prev.month === 11
              ? 0
              : prev.month + 1;
      
          const newYear =
            type === "decrease"
              ? prev.month === 0
                ? prev.year - 1
                : prev.year
              : prev.month === 11
              ? prev.year + 1
              : prev.year;
            
          return { year: newYear, month: newMonth, increment: prev.increment };
        });
      };

  const incrementTimeFrame = (type) => {
    if (type === "increase") {
      if (financeTimeFrame.increment === "months") {
        incrementMonth("increase");
      } else {
        setFinanceTimeFrame((prev) => ({
            ...prev,
            year: prev.year + 1
        }))
      }
    } else {
        if (financeTimeFrame.increment === "months") {
            incrementMonth("decrease");
          } else {
            setFinanceTimeFrame((prev) => ({
                ...prev,
                year: prev.year - 1
            }))
          }
    }
  };

  return (
    <div id="finance-time-frame">
      <div id="finance-increment-frame">
        <button
          onClick={() =>
            setFinanceTimeFrame((prev) => ({
              ...prev,
              increment: "years",
            }))
          }
          className={financeTimeFrame.increment === "years" ? "active" : ""}
        >
          Y
        </button>
        <button
          onClick={() =>
            setFinanceTimeFrame((prev) => ({
              ...prev,
              increment: "months",
            }))
          }
          className={financeTimeFrame.increment === "months" ? "active" : ""}
        >
          M
        </button>
        <button
          onClick={() =>
            setFinanceTimeFrame((prev) => ({
              ...prev,
              increment: "all",
            }))
          }
          className={financeTimeFrame.increment === "all" ? "active" : ""}
        >
          A
        </button>
      </div>
      <div id="finance-current-frame">
        <button
          className="finance-time-frame-button"
          style={{
            display: financeTimeFrame.increment === "all" ? "none" : "",
          }}
          onClick={() => incrementTimeFrame('decrease')}
        >
          <FaArrowLeftLong />
        </button>
        <p>{financeTimeFrame.increment === 'months' ? (monthNames[financeTimeFrame.month]) : 
        financeTimeFrame.increment === 'years' ? (financeTimeFrame.year) : ('All Time')}</p>
        <button
          className="finance-time-frame-button"
          style={{
            display: financeTimeFrame.increment === "all" ? "none" : "",
          }}
          onClick={() => incrementTimeFrame('increase')}
        >
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
}
