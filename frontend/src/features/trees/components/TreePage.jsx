import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTree } from '../';
import { SlashLoader } from '../../../components';

export default function TreePage({}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tree, setTree] = useState(null);

  useEffect(() => {
    const loadTree = async () => {
        const data = await fetchTree(id);
        setTree(data)
    }
    loadTree();
  },[id]);

  return (
    <div>
      {tree ? <div>
        Tree Page - {tree.title}
        <button onClick={() => navigate('/mind')}>DEFAULT</button>
      </div> : <SlashLoader/>}
    </div>
  );
}
