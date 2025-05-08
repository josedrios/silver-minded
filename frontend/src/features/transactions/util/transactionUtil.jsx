import { fetchTransactions } from "../";
import { convertToLocal } from "../../events";

export const fetchAndUpdateTransactions = async (transactions, setTransactions) => {
  const fetchedTransactions = await fetchTransactions(transactions.year, transactions.month);

  fetchedTransactions.forEach((transaction) => {
    transaction.createdAt = convertToLocal(transaction.createdAt);
  });

  setTransactions((prev) => ({
    ...prev,
    transactions: fetchedTransactions,
  }));
};