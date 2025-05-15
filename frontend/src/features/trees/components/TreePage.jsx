import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchTree,
  TreeHeader,
  TreeBody
} from '../';
import { SlashLoader} from '../../../components';

export default function TreePage({}) {
  const { id } = useParams();
  const [tree, setTree] = useState(null);

  useEffect(() => {
    const loadTree = async () => {
      const fetchedTree = await fetchTree(id);
      setTree(fetchedTree);
    };
    loadTree();
  }, [id]);

  return (
    <div className="tree-page">
      {tree ? (
        <>
          <TreeHeader tree={tree} setTree={setTree} />
          <TreeBody tree={tree}/>
        </>
      ) : (
        <SlashLoader />
      )}
    </div>
  );
}