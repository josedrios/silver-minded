import { useEffect, useState } from 'react';
import {
  BoxesIcon,
  Icon,
  Button,
  VerticalEllipsisIcon,
  ReactMultiSelect,
  FileBoxIcon,
  FilePenIcon,
  TextField,
} from '../../../components';
import { formateCustomDate } from '../../transactions';
import { tagOptions, getTagOption, editTreeHeader, deleteTree } from '../';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { handleDeleteNode } from '../../nodes';

export function TreeHeader({ tree, setTree }) {
  const [treeChanges, setTreeChanges] = useState({
    title: tree.title,
    note: tree.note,
    categories: tree.categories.map(getTagOption),
  });
  const location = useLocation();

  useEffect(() => {
    setTreeChanges({
      title: tree.title,
      note: tree.note,
      categories: tree.categories.map(getTagOption),
    });
  }, [tree]);

  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setEditMode(false);
  }, [location.pathname]);

  return (
    <div className="tree-page-header">
      <TreeTitle
        tree={treeChanges}
        setTree={setTreeChanges}
        treeDate={tree.createdAt}
        editMode={editMode}
        navigate={navigate}
        treeId={tree._id}
      />
      <TreeNote
        treeNote={treeChanges.note}
        setTree={setTreeChanges}
        editMode={editMode}
      />
      <TreeTags
        tree={treeChanges}
        setTree={setTreeChanges}
        editMode={editMode}
        setEditMode={setEditMode}
        oldTree={tree}
        setOriginalTree={setTree}
      />
    </div>
  );
}

function TreeTitle({ tree, setTree, treeDate, editMode, navigate, treeId }) {
  return (
    <div className="header-row">
      <Icon variant="mind" size="md">
        <BoxesIcon size="md" />
      </Icon>
      <div className="tree-title">
        <div className="tree-timestamp">
          {editMode ? (
            <TextField
              className="tree-title-edit"
              variant="gray"
              value={tree.title}
              onChange={(e) =>
                setTree((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          ) : (
            <h5>{tree.title}</h5>
          )}
          <p>CREATED: {formateCustomDate(treeDate)}</p>
        </div>
      </div>
      <TreeNodeDropdown navigate={navigate} type={'tree'} id={treeId}/>
    </div>
  );
}

function TreeNote({ treeNote, setTree, editMode }) {
  return editMode ? (
    <textarea
      value={treeNote}
      onChange={(e) =>
        setTree((prev) => ({
          ...prev,
          note: e.target.value,
        }))
      }
      className="tree-note-text-field"
      placeholder="Enter a note..."
    />
  ) : (
    <p className="tree-note">{treeNote}</p>
  );
}

function TreeTags({
  tree,
  setTree,
  editMode,
  setEditMode,
  oldTree,
  setOriginalTree,
}) {
  const setTreeCategories = (newValue) => {
    setTree((prev) => ({
      ...prev,
      categories: newValue,
    }));
  };

  return (
    <div className="tag-row">
      <span>TAGS:</span>
      {editMode ? (
        <ReactMultiSelect
          options={tagOptions}
          value={tree.categories}
          onChange={setTreeCategories}
          placeholder="/Floater"
          className="tree-category-select"
        />
      ) : (
        <div className="tree-categories">
          {tree.categories.length === 0 ? (
            <p>/Floater</p>
          ) : (
            tree.categories.map((cat, i) => <p key={i}>{cat.label}</p>)
          )}
        </div>
      )}
      <Button
        variant="gray"
        squared={true}
        className="borderless tree-edit-button"
        onClick={async () => {
          if (editMode === true) {
            const updatedTree = await editTreeHeader(oldTree, tree);
            if (updatedTree) {
              setOriginalTree(updatedTree);
            }
            setEditMode(false);
          } else {
            setEditMode(true);
          }
        }}
      >
        {editMode ? <FileBoxIcon /> : <FilePenIcon />}
      </Button>
    </div>
  );
}

export function TreeNodeDropdown({navigate, type, id, refreshChildren}) {
  return (
    <Menu as="div" className="tree-node-dropdown">
      <MenuButton as={'button'} className={'btn squared gray borderless'}>
        <VerticalEllipsisIcon />
      </MenuButton>
      <MenuItems anchor={'bottom-end'} className={'tree-node-dropdown-menu'}>
        <MenuItem>
          <button onClick={() => console.log('fav')}>Favorite</button>
        </MenuItem>
        <MenuItem>
          <button onClick={() => console.log('mov')}>Move</button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={async () => {
              if(type === 'tree') {
                await deleteTree(id);
              } else {
                await handleDeleteNode(id);
                await refreshChildren();
              }
              navigate('/mind');
            }}
          >
            Delete
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
