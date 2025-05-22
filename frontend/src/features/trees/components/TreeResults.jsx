import { useNavigate, useSearchParams } from 'react-router-dom';
import { TreeCardSection } from '../../../pages/Mind';
import { searchTrees } from '../services/treeService';

export default function TreeResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const navigate = useNavigate();

  return (
    <div>
      <TreeCardSection
        navigate={navigate}
        title={`Searched: ${query}`}
        fetchFunction={searchTrees}
        query={query}
      />
    </div>
  );
}
