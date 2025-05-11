export async function handleCreateTree() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/tree/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create tree');
    return data;
  } catch (err) {
    console.error('Create Tree Error:', err.message);
    return;
  }
}

export async function fetchTree(id) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/tree/${id}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch tree');
    return data;
  } catch (err) {
    console.error('Fetch Tree Error:', err.message);
    return;
  }
}
