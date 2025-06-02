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
        title={`Searched: '${query}'`}
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
                <HomeTreeCard
                  tree={tree}
                  navigate={navigate}
                  key={tree._id}
                  query={query}
                />
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

function HomeTreeCard({ tree, navigate, query }) {
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
      <div className="tree-card-body">
        <div className="tree-card-title">
          <Icon variant="mind">
            <BoxIcon />
          </Icon>
          <p>{tree.title}</p>
        </div>
        <div className="tree-card-id">ID: {tree._id}</div>
      </div>
      {query ? highlightWordRadius(tree.readableContent, query) : ''}
    </motion.div>
  );
}

function highlightWordRadius(content, query) {
  const radius = 3;
  if (!content) return '';
  const target = query.toLowerCase();
  const words = content.split(/\s+/);

  const ranges = words.reduce((acc, word, i) => {
    if (word.toLowerCase().includes(target)) {
      acc.push({
        min: Math.max(0, i - radius),
        max: Math.min(words.length, i + radius + 1),
      });
    }
    return acc;
  }, []);

  return ranges.map((range, i) => {
    console.log('RANGES LENGTH: ', ranges.length)
    console.log('ITERATION: ', i)
    return (
      <div className="tree-card-previews">
      <div className="tree-preview">
        <p className="branch">{ranges.length === i + 1
              ? '└─'
              : '├─'}</p>
        <p className="preview-text">
          {words.slice(range.min, range.max).map((word, i) => {
            const lowerWord = word.toLowerCase();
            if (lowerWord.includes(target)) {
              const parts = word.split(new RegExp(`(${target})`, 'i'));
              return (
                <span key={i}>
                  {parts.map((part, j) =>
                    part.toLowerCase() === target ? (
                      <span key={j} className="highlighted">
                        {part}
                      </span>
                    ) : (
                      part
                    )
                  )}{' '}
                </span>
              );
            }
            return <span key={i}>{word} </span>;
          })}
        </p>
      </div>
    </div>
    )
  });
}


// function highlightWordRadius(content, target, radius = 7) {
//   if (!content) return '';
//   const words = content.split(/\s+/);
//   const index = words.findIndex((word) =>
//     word.toLowerCase().includes(target.toLowerCase())
//   );
//   if (index === -1) return '';

//   const start = Math.max(0, index - radius);
//   const end = Math.min(words.length, index + radius + 1);
//   return words.slice(start, end).map((word, i) => {
//     const lowerWord = word.toLowerCase();
//     const lowerTarget = target.toLowerCase();
//     if (lowerWord.includes(lowerTarget)) {
//       const parts = word.split(new RegExp(`(${target})`, 'i'));
//       return (
//         <span key={i}>
//           {parts.map((part, j) =>
//             part.toLowerCase() === lowerTarget ? (
//               <span key={j} className='highlighted'>{part}</span>
//             ) : (
//               part
//             )
//           )}{' '}
//         </span>
//       );
//     }
//     return <span key={i}>{word} </span>;
//   });
// }
