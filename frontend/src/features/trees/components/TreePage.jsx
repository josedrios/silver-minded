import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTree, TreeHeader } from '../';
import { SlashLoader } from '../../../components';

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

  useEffect(() => {
    console.log("Tree:",tree)
  }, [tree]);

  return (
    <div className="tree-page">
      {tree ? <TreeHeader tree={tree} setTree={setTree}/> : <SlashLoader />}
    </div>
  );
}
