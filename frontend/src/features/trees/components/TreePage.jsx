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

  return (
    <div className="tree-page-header">
      <div className="header-row">
        <Icon variant="mind" size="md">
          <BoxesIcon size="md" />
        </Icon>
        <h5>{tree.title}</h5>
        <Button variant="gray" squared={true} className="tree-header-ellipsis borderless">
          <VerticalEllipsisIcon />
        </Button>
      </div>
      <div className='tag-row'>
        <span>Tags:</span><ReactMultiSelect
        options={[
          { value: 'idea', label: 'Idea' },
          { value: 'inspiration', label: 'Inspiration' },
          { value: 'learning', label: 'Learning' },
        ]}
        value={treeCategories}
        onChange={setTreeCategories}
        placeholder="NONE"
        className='tree-category-select'
      />
      </div>
    </div>
  );
}
