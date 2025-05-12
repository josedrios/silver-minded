import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTree } from '../';
import { SlashLoader, BoxesIcon, Icon } from '../../../components';

export default function TreePage({}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tree, setTree] = useState(null);

  useEffect(() => {
    const loadTree = async () => {
      const data = await fetchTree(id);
      setTree(data);
    };
    loadTree();
  }, [id]);

  return (
    <div>
      {tree ? (
        <div>
          <div>
            <Icon variant='accent'>
                <BoxesIcon />
            </Icon>
            {tree.title}
          </div>
        </div>
      ) : (
        <SlashLoader />
      )}
    </div>
  );
}
