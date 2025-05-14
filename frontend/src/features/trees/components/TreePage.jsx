import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTree, TreeHeader, TreeChildCard, handleCreateTree } from '../';
import { SlashLoader, BoxesIcon, BoxIcon } from '../../../components';
import { useNavigate } from 'react-router-dom';

export default function TreePage({}) {
  const { id } = useParams();
  const [tree, setTree] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTree = async () => {
      const data = await fetchTree(id);
      setTree(data);
    };
    loadTree();
  }, [id]);

  return (
    <div className="tree-page">
      {tree ? <TreeHeader tree={tree} setTree={setTree} /> : <SlashLoader />}
      <div className="tree-children-container">
        {/* <TreeChildCard /> */}
        <ChildCreate navigate={navigate} parentId={tree ? tree._id : null}/>
      </div>
    </div>
  );
}

function ChildCreate({ navigate, parentId }) {
  return (
    <div className="create-child-container">
      <button onClick={async() => {
        const id = await handleCreateTree(parentId);
        navigate(`/mind/${id}`)
      }}>
        <BoxesIcon /> Tree
      </button>
      <button>
        <BoxIcon /> Node
      </button>
    </div>
  );
}
