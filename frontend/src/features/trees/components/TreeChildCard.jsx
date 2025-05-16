import { useNavigate } from 'react-router-dom';
import {
  editTreeOrder,
  handleCreateTree,
  TreeCardContent,
} from '../';
import { NodeCardContent, handleCreateNode } from '../../nodes';
import { Modal, BoxesIcon, BoxIcon } from '../../../components';
import { useState } from 'react';

export default function TreeChildCard({
  child,
  lastChild,
  parentId,
  refreshChildren,
}) {
  const navigate = useNavigate();
  const [insertChildModal, setInsertChildModal] = useState(false);

  return (
    <>
      <button
        className="insert-child-button"
        onClick={() => {
          setInsertChildModal(true);
        }}
      />
      <div className="tree-child-card">
        <TreeBranch lastChild={lastChild} />
        <div
          className={`tree-child-body ${child.type}`}
          onClick={() => {
            if (child.type === 'tree') {
              navigate(`/mind/${child._id}`);
            }
          }}
        >
          {child.type === 'tree' ? (
            <TreeCardContent tree={child} />
          ) : (
            <NodeCardContent node={child} />
          )}
        </div>
      </div>
      <Modal
        isOpen={insertChildModal}
        onClose={() => setInsertChildModal(false)}
      >
        <InsertChildModal
          navigate={navigate}
          parentId={parentId}
          referenceId={child._id}
          refreshChildren={refreshChildren}
          setInsertChildModal={setInsertChildModal}
        />
      </Modal>
    </>
  );
}

function TreeBranch({ lastChild = false }) {
  return (
    <div className="tree-branch-wrapper">
      <div
        className="tree-branch-vertical"
        style={{ height: !lastChild ? '100%' : '' }}
      />
      <div className="tree-branch-horizontal" />
    </div>
  );
}

function InsertChildModal({
  navigate,
  parentId,
  referenceId,
  refreshChildren,
  setInsertChildModal,
}) {
  return (
    <div className="insert-child-modal">
      <h5>INSERT:</h5>
      <div className="insert-button-options">
        <button
          className="create-child-button"
          onClick={async () => {
            const id = await handleCreateTree(parentId);
            await editTreeOrder(parentId, id, 'tree', referenceId);
            navigate(`/mind/${id}`);
            // refreshChildren();
            // setInsertChildModal(false);
          }}
        >
          <BoxesIcon /> Tree
        </button>
        <p>OR</p>
        <button
          className="create-child-button"
          onClick={async () => {
            const id = await handleCreateNode(parentId);
            await editTreeOrder(parentId, id, 'node', referenceId);
            refreshChildren();
            setInsertChildModal(false);
          }}
        >
          <BoxIcon /> Node
        </button>
      </div>
    </div>
  );
}
