import { useEffect, useRef, useState } from 'react';
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

export default function TreeHeader({ tree }) {
  const [editMode, setEditMode] = useState(false);
  const [treeCategories, setTreeCategories] = useState([]);
  const [tempDesc, setTempDesc] = useState('This is a temporary description');

  useEffect(() => {
    console.log(treeCategories);
  }, [treeCategories]);

  return (
    <div className="tree-page-header">
      <TreeTitle tree={tree} editMode={editMode} />
      <TreeNote value={tempDesc} editMode={editMode} />
      <TreeTags
        tree={tree}
        treeCategories={treeCategories}
        setTreeCategories={setTreeCategories}
        editMode={editMode}
        setEditMode={setEditMode}
      />
    </div>
  );
}

function TreeTitle({ tree, editMode }) {
  return (
    <div className="header-row">
      <Icon variant="mind" size="md">
        <BoxesIcon size="md" />
      </Icon>
      <div className="tree-title">
        <div className="tree-timestamp">
          {editMode ? <TextField className='tree-title-edit' variant='gray' value={tree.title}/> : <h5>{tree.title}</h5>}
          <p>CREATED: {formateCustomDate(tree.createdAt)}</p>
        </div>
      </div>
      <Button
        variant="gray"
        squared={true}
        className="tree-header-ellipsis borderless"
      >
        <VerticalEllipsisIcon />
      </Button>
    </div>
  );
}

function TreeNote({ value, editMode }) {
  const [tempValue, setTempValue] = useState(value);
  const textRef = useRef(null);

  useEffect(() => {
    if (editMode && textRef.current) {
      const len = textRef.current.value.length;
      textRef.current.setSelectionRange(len, len);
    }
  }, [editMode]);

  return editMode ? (
    <textarea
      ref={textRef}
      value={tempValue}
      onChange={(e) => setTempValue(e.target.value)}
      className="tree-note-text-field"
    />
  ) : (
    <p className="tree-note" onClick={() => setIsEditing(true)}>
      {tempValue}
    </p>
  );
}

function TreeTags({
  tree,
  treeCategories,
  setTreeCategories,
  editMode,
  setEditMode,
}) {
  const tagOptions = [
    { value: 'idea', label: '/Idea' },
    { value: 'inspiration', label: '/Inspiration' },
    { value: 'learning', label: '/Learning' },
  ];

  return (
    <div className="tag-row">
      <span>TAGS:</span>
      {editMode ? (
        <ReactMultiSelect
          options={tagOptions}
          value={treeCategories}
          onChange={setTreeCategories}
          placeholder="/FLOATER"
          className="tree-category-select"
        />
      ) : (
        <div className="tree-categories">
          {treeCategories.length === 0 ? (
            <p>/FLOATER</p>
          ) : (
            treeCategories.map((cat, i) => <p key={i}>{cat.label}</p>)
          )}
        </div>
      )}
      <Button
        variant="gray"
        squared={true}
        className="borderless tree-edit-button"
        onClick={() => setEditMode((prev) => !prev)}
      >
        {editMode ? <FilePenIcon /> : <FileBoxIcon />}
      </Button>
    </div>
  );
}
