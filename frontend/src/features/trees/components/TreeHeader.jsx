import { useEffect, useState, useRef } from 'react';
import {
  BoxIcon,
  Icon,
  Button,
  VerticalEllipsisIcon,
  ReactMultiSelect,
  FileBoxIcon,
  FilePenIcon,
  TextField,
  StarIcon,
} from '../../../components';
import { formateCustomDate } from '../../transactions';
import { tagOptions, getTagOption, editTreeHeader, deleteTree } from '../';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { convertToLocal } from '../../events';

export function TreeHeader({ tree, setTree }) {
  const [treeChanges, setTreeChanges] = useState({
    title: tree.title,
    categories: tree.categories.map(getTagOption),
    isFavorite: tree.isFavorite,
  });
  const location = useLocation();

  useEffect(() => {
    setTreeChanges({
      title: tree.title,
      categories: tree.categories.map(getTagOption),
      isFavorite: tree.isFavorite,
    });
  }, [tree]);

  function debounce(func, delay) {
    let timeout;
    const debounced = (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
    debounced.cancel = () => clearTimeout(timeout);
    return debounced;
  }

  useEffect(() => {
    const debouncedUpdate = debounce(async () => {
      const updatedTree = await editTreeHeader(tree, treeChanges);
      if (updatedTree) {
        setTree(updatedTree);
      }
    }, 1000);

    debouncedUpdate();

    return () => {
      debouncedUpdate.cancel();
    };
  }, [treeChanges]);

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
        navigate={navigate}
        treeId={tree._id}
        treeChanges={treeChanges}
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

function TreeTitle({
  tree,
  setTree,
  treeDate,
  navigate,
  treeId,
  treeChanges,
}) {
  return (
    <div className="header-row">
      <Icon variant="mind" size="md">
        <BoxIcon size="md" />
      </Icon>
      <div className="tree-title">
        <div
          className="star-tree-icon-container"
          onClick={() => {
            setTree((prev) => ({
              ...prev,
              isFavorite: !prev.isFavorite,
            }));
          }}
        >
          <StarIcon
            className={`star-tree-icon ${
              treeChanges.isFavorite ? 'is-favorite' : ''
            }`}
          />
        </div>
        <div className="tree-timestamp">
          <input
            type="text"
            className="tree-title-editor"
            value={tree.title}
            onChange={(e) =>
              setTree((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />
          <p>CREATED: {formateCustomDate(convertToLocal(treeDate))}</p>
        </div>
      </div>
      <TreeDropdown navigate={navigate} type={'tree'} id={treeId} />
    </div>
  );
}

function TreeTags({
  tree,
  setTree,
  editMode,
  setEditMode,
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
          placeholder="Select Tags"
          className="tree-category-select"
        />
      ) : (
        <div className="tree-categories">
          {tree.categories.length === 0 ? (
            <p>NONE</p>
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

function TreeDropdown({ navigate, id }) {
  return (
    <Menu as="div" className="tree-node-dropdown">
      <MenuButton as={'button'} className={'btn squared gray borderless'}>
        <VerticalEllipsisIcon />
      </MenuButton>
      <MenuItems anchor={'bottom-end'} className={'tree-node-dropdown-menu'}>
        <MenuItem>
          <button
            onClick={async () => {
              await deleteTree(id);
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
