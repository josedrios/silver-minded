import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  PlusIcon,
  SearchIcon,
  BrainCircuitIcon,
} from '../components';
import {
  fetchFavoriteTrees,
  fetchRecentTrees,
  handleCreateTree,
  TreeCardSection,
} from '../features/trees';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const list = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { type: 'tween', duration: 0.15 } },
};

export function Mind() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/mind')) {
      localStorage.setItem('lastMindPath', location.pathname);
    }
  }, [location]);

  return (
    <AnimatePresence>
      <motion.div initial="hidden" animate="visible" variants={list}>
        <MindHeader navigate={navigate} />
        <Outlet />
      </motion.div>
    </AnimatePresence>
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
    <motion.div
      layout
      variants={item}
      exit={{ opacity: 0, y: 20 }}
      className="mind-header-wrapper"
    >
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
            navigate(`/mind/id/${id}`);
          }}
        >
          <PlusIcon />
        </Button>
      </div>
    </motion.div>
  );
}

export function MindHome() {
  const navigate = useNavigate();

  return (
    <motion.div layout variants={item} exit={{ opacity: 0, y: 20 }}>
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
    </motion.div>
  );
}