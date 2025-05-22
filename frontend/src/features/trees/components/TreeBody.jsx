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
import { motion, AnimatePresence } from 'motion/react';

const list = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

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
  }, [tree._id, refreshKey]);

  return (
    <div className="tree-body">
      <AnimatePresence>
        <motion.div initial="hidden"
          animate="visible"
          variants={list} className="tree-children-container">
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
        </motion.div>
      </AnimatePresence>
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
          navigate(`/mind/id/${id}`);
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
