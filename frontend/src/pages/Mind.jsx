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
import {
  fetchFavoriteTrees,
  fetchRecentTrees,
  handleCreateTree,
} from '../features/trees';
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
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <div className="mind-header-wrapper">
      <div className="mind-header">
        {location.pathname !== '/mind' ? (
          <Button
            squared={true}
            variant="mind"
            onClick={async () => {
              navigate('');
              setSearchQuery('');
            }}
          >
            <BrainCircuitIcon />
          </Button>
        ) : (
          ''
        )}
        <form action="" onSubmit={(e) => handleSearch(e)}>
          <TextField
            variant="gray"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            afterIcon={SearchIcon}
            placeholder="Search for trees..."
          />
        </form>
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
      <TreeCardSection
        navigate={navigate}
        title={'FAVORITES'}
        fetchFunction={fetchFavoriteTrees}
      />
      <TreeCardSection
        navigate={navigate}
        title={'RECENTLY VIEWED'}
        fetchFunction={fetchRecentTrees}
      />
    </div>
  );
}

export function TreeCardSection({ navigate, title, fetchFunction, query }) {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    const loadTrees = async () => {
      const data = await fetchFunction(query);
      setTrees(data);
    };
    loadTrees();
  }, [query]);

  return (
    <div className="trees-section">
      <p className="tree-section-header">{title}</p>
      <div className="tree-cards-container">
        {trees
          ? trees.map((tree, i) => (
              <HomeTreeCard tree={tree} navigate={navigate} key={i} />
            ))
          : ''}
        {trees.length === 0 ? <p className='no-trees-found'>No trees found...</p> : ''}
      </div>
    </div>
  );
}

export function HomeTreeCard({ tree, navigate }) {
  return (
    <div
      onClick={() => {
        navigate(`/mind/id/${tree._id}`);
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
