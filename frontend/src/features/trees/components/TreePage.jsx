import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTree, TreeHeader, TreeBody } from '../';
import { SlashLoader } from '../../../components';
import { motion, AnimatePresence } from 'motion/react';

export default function TreePage({}) {
  const { id } = useParams();
  const [tree, setTree] = useState(null);

  useEffect(() => {
    const loadTree = async () => {
      const fetchedTree = await fetchTree(id);
      setTree(fetchedTree);
    };
    loadTree();
  }, [id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="tree-page"
    >
      {tree ? (
        <>
          <TreeHeader tree={tree} setTree={setTree} />
          <TreeBody tree={tree} />
        </>
      ) : (
        <SlashLoader />
      )}
    </motion.div>
  );
}
