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

const cardList = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { type: 'tween', duration: 0.3 } },
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
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardList}
          className="tree-cards-container"
        >
          {trees
            ? trees.map((tree, i) => (
                <HomeTreeCard tree={tree} navigate={navigate} key={tree._id} />
              ))
            : ''}
          {trees.length === 0 ? (
            <p className="no-trees-found">No trees found...</p>
          ) : (
            ''
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function HomeTreeCard({ tree, navigate }) {
  return (
    <motion.div
      layout
      variants={cardItem}
      exit={{ opacity: 0, y: 20 }}
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
    </motion.div>
  );
}
