import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTree, TreeHeader } from '../';
import { SlashLoader, PlusIcon } from '../../../components';

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
      {tree ? <TreeHeader tree={tree} setTree={setTree}/> : <SlashLoader />}
      <div className='tree-children-container'>
        <TreeChildCard />
      </div>
    </div>
  );
}

function TreeChildCard() {
  return (
    <div className="tree-child-card">
      <div className="tree-child-branch">
        TB
      </div>
      <div className='tree-child-body'>
        <button><PlusIcon /></button>
        <div className='tree-child-content'>CONTENT</div>
      </div>
    </div>
  )
}
