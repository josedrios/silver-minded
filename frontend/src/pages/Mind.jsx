import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  PlusIcon,
  SearchIcon,
  BrainCircuitIcon,
  BoxesIcon,
  Icon,
} from '../components';
import { fetchAllTrees, fetchFavoriteTrees, fetchRecentTrees, handleCreateTree } from '../features/trees';
import { useEffect, useState } from 'react';
import { convertToLocal } from '../features/events';
import { formateCustomDate } from '../features/transactions';

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
          variant="mind"
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

  return (
    <div>
      <TreeCardSection navigate={navigate} title={'FAVORITES'} fetchFunction={fetchFavoriteTrees}/>
      <TreeCardSection navigate={navigate} title={'RECENTLY VIEWED'} fetchFunction={fetchRecentTrees}/>
    </div>
  );
}

export function TreeCardSection({ navigate, title, fetchFunction }) {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    const loadTrees = async () => {
      const data = await fetchFunction();
      setTrees(data);
    };
    loadTrees();
  }, []);
  return (
    <div className="trees-section">
      <p className="tree-section-header">{title}</p>
      <div className="tree-cards-container">
        {trees
          ? trees.map((tree, i) => (
              <TempTreeCard tree={tree} navigate={navigate} key={i} />
            ))
          : ''}
      </div>
    </div>
  );
}

export function TempTreeCard({ tree, navigate }) {
  return (
    <div
      onClick={() => {
        navigate(`/mind/${tree._id}`);
      }}
      className="home-tree-card"
    >
      <div className="tree-card-header">
        <Icon variant="mind">
          <BoxesIcon />
        </Icon>
        <p>{tree.title}</p>
      </div>
      <p className="tree-card-note">{tree.note}</p>
    </div>
  );
}
