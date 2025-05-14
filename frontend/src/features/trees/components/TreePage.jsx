import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchTree,
  TreeHeader,
  TreeChildCard,
  handleCreateTree,
  editTreeOrder,
  fetchTreeChildren,
} from '../';
import { SlashLoader, BoxesIcon, BoxIcon } from '../../../components';
import { useNavigate } from 'react-router-dom';

export default function TreePage({}) {
  const { id } = useParams();
  const [tree, setTree] = useState(null);
  const [treeChildren, setTreeChildren] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTree = async () => {
      const fetchedTree = await fetchTree(id);
      setTree(fetchedTree);
      const fetchedChildren = await fetchTreeChildren(id);
      setTreeChildren(fetchedChildren);
    };
    loadTree();
  }, [id]);

  return (
    <div className="tree-page">
      {tree ? <TreeHeader tree={tree} setTree={setTree} /> : <SlashLoader />}
      <div className="tree-children-container">
        {/* <TreeChildCard /> */}
        {treeChildren
          ? treeChildren.map((child, index) => (
              <TreeChildCard
                child={child}
                lastChild={index === treeChildren.length - 1}
              />
            ))
          : ''}
        <ChildCreate navigate={navigate} parentId={tree ? tree._id : null} />
      </div>
    </div>
  );
}

function ChildCreate({ navigate, parentId }) {
  return (
    <div className="create-child-container">
      <button
        onClick={async () => {
          const id = await handleCreateTree(parentId);
          await editTreeOrder(parentId, id, 'tree');
          navigate(`/mind/${id}`);
        }}
      >
        <BoxesIcon /> Tree
      </button>
      <button>
        <BoxIcon /> Node
      </button>
    </div>
  );
}
