import { useNavigate } from 'react-router-dom';
import { editTreeOrder, handleCreateTree, TreeCardContent } from '../';
import { NodeCardContent } from '../../nodes';

export default function TreeChildCard({ child, lastChild, parentId }) {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="insert-child-button"
        onClick={async () => {
          const id = await handleCreateTree(parentId);
          await editTreeOrder(parentId, id, 'tree', child._id);
          navigate(`/mind/${id}`);
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
          {/* Add NodeCardContent for else */}
          {child.type === 'tree' ? <TreeCardContent tree={child} /> : <NodeCardContent node={child}/>}
        </div>
      </div>
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
