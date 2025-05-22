import { useNavigate, useSearchParams } from 'react-router-dom';
import { TreeCardSection } from '../../../pages/Mind';
import { searchTrees } from '../services/treeService';
import { motion } from 'motion/react';

export default function TreeResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}>
      <TreeCardSection
        navigate={navigate}
        title={`Searched: ${query}`}
        fetchFunction={searchTrees}
        query={query}
      />
    </motion.div>
  );
}
