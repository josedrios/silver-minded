export async function handleCreateNode(parentId = null) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/node/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parentId }),
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create node');
    return data;
  } catch (err) {
    console.error('Create Node Error:', err.message);
    return;
  }
}

export async function handleEditContent(id, content) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/node/${id}/content`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      }
    );
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || 'Failed to edit node content');
    return data;
  } catch (err) {
    console.error('Edit Node Content Error:', err.message);
    return;
  }
}

export async function handleDeleteNode(id) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/node/${id}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || 'Failed to delete node content');
    return data;
  } catch (err) {
    console.error('Node Deletion Content Error:', err.message);
    return;
  }
}

export async function handleNodeTitleChange(id, title) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/node/${id}/title`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title})
      }
    );
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || 'Failed to edit node title');
    return data;
  } catch (err) {
    console.error('Node Title Change Error:', err.message);
    return;
  }
}
