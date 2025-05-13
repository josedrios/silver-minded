import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTree } from '../';
import {
  SlashLoader,
  BoxesIcon,
  Icon,
  Button,
  VerticalEllipsisIcon,
  ReactMultiSelect,
} from '../../../components';
import { formateCustomDate } from '../../transactions';

export default function TreePage({}) {
  const { id } = useParams();
  const [tree, setTree] = useState(null);

  useEffect(() => {
    const loadTree = async () => {
      const data = await fetchTree(id);
      setTree(data);
    };
    loadTree();
  }, [id]);

  return (
    <div className="tree-page">
      {tree ? <TreeHeader tree={tree} /> : <SlashLoader />}
    </div>
  );
}

function TreeHeader({ tree }) {
  const [treeCategories, setTreeCategories] = useState([]);

  const [tempDesc, setTempDesc] = useState('This is a temporary description');

  return (
    <div className="tree-page-header">
      <div className="header-row">
        <Icon variant="mind" size="md">
          <BoxesIcon size="md" />
        </Icon>
        <div className="tree-title">
          <h5>{tree.title}</h5>
          <div className="tree-timestamp">
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
      <div className="tree-note-wrapper">
        <TreeNote value={tempDesc} onChange={setTempDesc} />
      </div>
      <div className="tag-row">
        <span>TAGS:</span>
        <ReactMultiSelect
          options={[
            { value: 'idea', label: '/Idea' },
            { value: 'inspiration', label: '/Inspiration' },
            { value: 'learning', label: '/Learning' },
          ]}
          value={treeCategories}
          onChange={setTreeCategories}
          placeholder="/FLOATER"
          className="tree-category-select"
        />
      </div>
    </div>
  );
}

function TreeNote({ value, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const textRef = useRef(null);

  useEffect(() => {
    if (isEditing && textRef.current) {
      const len = textRef.current.value.length;
      textRef.current.setSelectionRange(len, len);
    }
  }, [isEditing]);

  const handleBlur = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  return isEditing ? (
    <textarea
      ref={textRef}
      autoFocus
      value={tempValue}
      onChange={(e) => setTempValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.target.blur();
      }}
      className="tree-note-text-field"
    />
  ) : (
    <p className="tree-note" onClick={() => setIsEditing(true)}>
      {tempValue}
    </p>
  );
}
