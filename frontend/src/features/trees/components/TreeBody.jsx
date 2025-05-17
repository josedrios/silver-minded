import { useEffect, useState } from 'react';
import {
  TreeChildCard,
  handleCreateTree,
  editTreeOrder,
  fetchTreeChildren,
} from '../';
import { BoxesIcon, BoxIcon } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { handleCreateNode } from '../../nodes';

export function TreeBody({ tree }) {
  const navigate = useNavigate();
  const [treeChildren, setTreeChildren] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshChildren = () => setRefreshKey((prev) => prev + 1);

  const loadChildren = async () => {
    const fetchedChildren = await fetchTreeChildren(tree._id);
    setTreeChildren(fetchedChildren);
    console.log(fetchedChildren);
  };

  useEffect(() => {
    loadChildren();
  }, [tree, refreshKey]);

  return (
    <div className="tree-body">
      <div className="tree-children-container">
        {treeChildren
          ? treeChildren.map((child, index) => (
              <TreeChildCard
                key={child._id}
                child={child}
                lastChild={index === treeChildren.length - 1}
                parentId={tree._id}
                refreshChildren={refreshChildren}
              />
            ))
          : ''}
      </div>
      <CreateChild
        navigate={navigate}
        loadChildren={loadChildren}
        parentId={tree ? tree._id : null}
      />
    </div>
  );
}

function CreateChild({ navigate, parentId, loadChildren }) {
  return (
    <div className="create-child-container">
      <button
        className="create-child-button"
        onClick={async () => {
          const id = await handleCreateTree(parentId);
          await editTreeOrder(parentId, id, 'tree');
          navigate(`/mind/${id}`);
        }}
      >
        <BoxesIcon /> Tree
      </button>
      <button
        className="create-child-button"
        onClick={async () => {
          const id = await handleCreateNode(parentId);
          await editTreeOrder(parentId, id, 'node');
          loadChildren();
        }}
      >
        <BoxIcon /> Node
      </button>
    </div>
  );
}
