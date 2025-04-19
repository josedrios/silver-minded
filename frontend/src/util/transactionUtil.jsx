export async function createTransaction(transaction) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/transaction/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            info: transaction.info,
            paidAt: transaction.paidAt,
            type: transaction.type,
            amount: transaction.amount,
            category: transaction.category,
          }),
        }
      );
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to create transaction");
      return;
    } catch (err) {
      console.error("Create transaction Error:", err.message);
      return;
    }
  }
  
  export async function editTransaction(event, id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/transaction/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            info: transaction.info,
            paidAt: transaction.paidAt,
            type: transaction.type,
            amount: transaction.amount,
            category: transaction.category,
          }),
        }
      );
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to edit transaction");
      return;
    } catch (err) {
      console.error("Edit transaction Error:", err.message);
      return;
    }
  }
  
  export async function fetchTransactions(year, month) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/transaction/${year}` + (month ? `/${month}` : ''),
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch transactions");
      return data;
    } catch (err) {
      console.error("Fetch Transactions Error:", err.message);
      return;
    }
  }
  
  export async function deleteTransactions(id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/transactions/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        }
      );
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete transactions");
      return;
    } catch (err) {
      console.error("Edit Transactions Error:", err.message);
      return;
    }
  }