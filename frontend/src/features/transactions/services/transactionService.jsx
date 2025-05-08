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
      if (!response.ok) throw new Error(data.message || 'Failed to create transaction');
      return data;
    } catch (err) {
      console.error('Create Transaction Error:', err.message);
      return;
    }
  }