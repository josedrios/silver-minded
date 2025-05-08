import { getStartEndDates, convertToUTC } from "../../events";

export async function createTransaction(transaction) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/transaction/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transaction }),
      }
    );

    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || 'Failed to create transaction');
    return data;
  } catch (err) {
    console.error('Create Transaction Error:', err.message);
    return;
  }
}

export async function fetchTransactions(year, month) {
  try {
    const { start, end } = getStartEndDates(year, month);

    const startUTC = convertToUTC(start);
    const endUTC = convertToUTC(end);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/transaction/${startUTC}/${endUTC}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch transactions');
    }

    return data;
  } catch (err) {
    console.error('Fetch Transactions Error:', err.message);
    throw err;
  }
}

export async function editTransaction(transaction, id) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/transaction/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transaction }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to edit transaction');
    }

    return data;
  } catch (err) {
    console.error('Transaction Edit Error:', err.message);
    throw err;
  }
}

export async function deleteTransaction(id) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/transaction/${id}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete transaction');
    }

    return data;
  } catch (err) {
    console.error('Transaction Deletion Error:', err.message);
    throw err;
  }
}