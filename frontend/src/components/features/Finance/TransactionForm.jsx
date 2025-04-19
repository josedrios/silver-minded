import { createTransaction } from "../../../util/transactionUtil";

export default function TransactionsForm({
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