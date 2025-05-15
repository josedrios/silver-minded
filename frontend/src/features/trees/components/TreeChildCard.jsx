import { useEffect, useState, useRef } from 'react';
import { BoxesIcon, BoxIcon, Icon } from '../../../components';
import { formateCustomDate } from '../../transactions';
import { useNavigate } from 'react-router-dom';
import { editTreeOrder, handleCreateTree } from '../services/treeService';

export function TreeChildCard({ child, lastChild, parentId }) {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={async () => {
          const id = await handleCreateTree(parentId);
          await editTreeOrder(parentId, id, 'tree', child._id);
          navigate(`/mind/${id}`);
        }}
        className="insert-child-button"
      />
      <div className="tree-child-card">
        <TreeBranch lastChild={lastChild} />
        <div className="tree-child-body">
          {/* CLASSNAME CONTAINS TREE CHILD TYPE TO DIFFERENTIATE STYLES BETWEEN TREES AND NODES */}
          <div
            className="tree-child-content tree"
            onClick={() => {
              navigate(`/mind/${child._id}`);
            }}
          >
            <TreeChildContent tree={child} />
          </div>
        </div>
      </div>
    </>
  );
}

function TreeChildContent({ tree }) {
  return (
    <>
      <div className="header-row">
        <Icon variant="mind">
          <BoxesIcon />
        </Icon>
        <p>{tree.title}</p>{' '}
      </div>
      <p className="note-section">{tree.note}</p>
      <p className="timestamp-section">
        CREATED: {formateCustomDate(tree.createdAt)}
      </p>
    </>
  );
}

function NodeChildContent({ node }) {}

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
