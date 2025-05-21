import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  PlusIcon,
  SearchIcon,
  BrainCircuitIcon,
} from '../components';
import { fetchAllTrees, handleCreateTree } from '../features/trees';
import { useEffect, useState } from 'react';

export function Mind() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/mind')) {
      localStorage.setItem('lastMindPath', location.pathname);
    }
  }, [location]);

  return (
    <div>
      <MindHeader navigate={navigate} />
      <Outlet />
    </div>
  );
}

function MindHeader({ navigate }) {
  const location = useLocation();

  return (
    <div className="mind-header-wrapper">
      <div className="mind-header">
        {location.pathname !== '/mind' ? (
          <Button
            squared={true}
            variant="mind"
            onClick={async () => {
              navigate('');
            }}
          >
            <BrainCircuitIcon />
          </Button>
        ) : (
          ''
        )}
        <TextField
          variant="gray"
          afterIcon={SearchIcon}
          placeholder="Search for trees and nodes..."
        />
        <Button
          squared={true}
          variant='mind'
          onClick={async () => {
            const id = await handleCreateTree();
            navigate(`/mind/${id}`);
          }}
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
}

export function MindHome() {
  const navigate = useNavigate();

  const [trees, setTrees] = useState([]);

  useEffect(() => {
    const loadTrees = async () => {
      const data = await fetchAllTrees();
      setTrees(data);
    };
    loadTrees();
  }, []);

  return (
    <div>
      Trees:
      {trees
        ? trees.map((tree, i) => (
            <TempTreeCard tree={tree} navigate={navigate} key={i} />
          ))
        : ''}
    </div>
  );
}

export function TempTreeCard({ tree, navigate }) {
  return (
    <div
      onClick={() => {
        navigate(`/mind/${tree._id}`);
      }}
      className="temp-tree-card"
    >
      <p>{tree.title}</p>
      <p>{tree.createdAt}</p>
    </div>
  );
}
