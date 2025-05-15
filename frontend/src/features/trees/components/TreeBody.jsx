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

export const loadChildren = async (treeId, setTreeChildren) => {
  const fetchedChildren = await fetchTreeChildren(treeId);
  setTreeChildren(fetchedChildren);
  console.log(fetchedChildren);
};

export function TreeBody({ tree }) {
  const navigate = useNavigate();
  const [treeChildren, setTreeChildren] = useState([]);

  useEffect(() => {
    loadChildren(tree._id, setTreeChildren);
  }, [tree]);

  return (
    <div className="tree-body">
      <div className="tree-children-container">
        {treeChildren
          ? treeChildren.map((child, index) => (
              <TreeChildCard
                child={child}
                lastChild={index === treeChildren.length - 1}
                parentId={tree._id}
                setTreeChildren={setTreeChildren}
              />
            ))
          : ''}
      </div>
      <CreateChild
        navigate={navigate}
        loadChildren={loadChildren}
        parentId={tree ? tree._id : null}
        setTreeChildren={setTreeChildren}
      />
    </div>
  );
}

function CreateChild({ navigate, parentId, loadChildren, setTreeChildren }) {
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
          loadChildren(parentId, setTreeChildren);
        }}
      >
        <BoxIcon /> Node
      </button>
    </div>
  );
}
