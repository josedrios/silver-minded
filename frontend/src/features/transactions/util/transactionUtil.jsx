import dayjs from "dayjs";
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

export const formatTransactionDate = (date) => {
  return dayjs(date).format('DD MMM YYYY, HH:mm').toUpperCase();
}

export const selectedToForm = (transaction) => {
  return {
    info: transaction.info,
    amount: transaction.amount,
    category: transaction.category
  }
}