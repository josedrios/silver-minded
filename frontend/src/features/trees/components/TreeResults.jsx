import { useNavigate, useSearchParams } from 'react-router-dom';
import { searchTrees } from '../services/treeService';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { BoxIcon, Icon } from '../../../components';
import { formateCustomDate } from '../../transactions';

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

export function TreeResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
    >
      <TreeCardSection
        navigate={navigate}
        title={`Searched: ${query}`}
        fetchFunction={searchTrees}
        query={query}
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

function HomeTreeCard({ tree, navigate }) {
  return (
    <motion.div
      layout
      variants={cardItem}
      exit={{ opacity: 0, y: 20 }}
      onClick={() => {
        navigate(`/mind/id/${tree._id}`);
      }}
      className="home-tree-card"
      title={`Last Updated: ${formateCustomDate(tree.updatedAt)}`}
    >
      <div className="tree-card-title">
        <Icon variant="mind">
          <BoxIcon />
        </Icon>
        <p>{tree.title}</p>
      </div>
      <div className="tree-card-id">
        ID: {tree._id}
      </div>
    </motion.div>
  );
}
