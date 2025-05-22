export async function handleCreateTree(parentId = null) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/tree/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parentId }),
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

export async function deleteTree(id) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/tree/${id}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to delete tree');
    return data;
  } catch (err) {
    console.error('Delete Tree Error:', err.message);
    return;
  }
}

export async function editTree(id, changes) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/tree/${id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changes }),
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to edit tree');
    return data;
  } catch (err) {
    console.error('Edit Tree Error:', err.message);
    return;
  }
}

export async function editTreeOrder(treeId, childId, type, referenceId = null) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/tree/order/${treeId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ childId, referenceId, type }),
      }
    );
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || 'Failed to edit tree order');
    return data;
  } catch (err) {
    console.error('Edit Tree Order Error:', err.message);
    return;
  }
}

export async function fetchTreeChildren(id) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/tree/children/${id}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || 'Failed to fetch children of tree');
    return data;
  } catch (err) {
    console.error('Fetch Tree Children Error:', err.message);
    return;
  }
}

export async function fetchFavoriteTrees() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/tree/favorites`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch favorite trees');
    return data;
  } catch (err) {
    console.error('Fetch Favorite Trees Error:', err.message);
    return;
  }
}

export async function fetchRecentTrees() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/tree/recents`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch recent trees');
    return data;
  } catch (err) {
    console.error('Fetch Recent Trees Error:', err.message);
    return;
  }
}


// TEMP FOR DEV
export async function fetchAllTrees() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/tree/all`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch all trees');
    return data;
  } catch (err) {
    console.error('Fetch Trees Error:', err.message);
    return;
  }
}
