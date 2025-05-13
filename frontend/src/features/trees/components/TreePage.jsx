import { useEffect, useState } from 'react';
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
        <h5>{tree.title}</h5>
        <Button
          variant="gray"
          squared={true}
          className="tree-header-ellipsis borderless"
        >
          <VerticalEllipsisIcon />
        </Button>
      </div>
      <TreeDescription value={tempDesc} onChange={setTempDesc} />
      <div className="tag-row">
        <span>Tags:</span>
        <ReactMultiSelect
          options={[
            { value: 'idea', label: 'Idea' },
            { value: 'inspiration', label: 'Inspiration' },
            { value: 'learning', label: 'Learning' },
          ]}
          value={treeCategories}
          onChange={setTreeCategories}
          placeholder="NONE"
          className="tree-category-select"
        />
      </div>
    </div>
  );
}

function TreeDescription({ value, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleBlur = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  return isEditing ? (
    <textarea
      autoFocus
      value={tempValue}
      onChange={(e) => setTempValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if(e.key === 'Enter') e.target.blur();
      }}
    />
  ) : (
    <p onClick={() => setIsEditing(true)}>{tempValue}</p>
  );
}
