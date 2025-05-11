import { Outlet, useNavigate } from 'react-router-dom';
import { Button, TextField, PlusIcon, SearchIcon } from '../components';
import { handleCreateTree } from '../features/trees';

export function Mind() {
  const navigate = useNavigate();

  return (
    <div>
      <MindHeader navigate={navigate} />
      <Outlet />
    </div>
  );
}

function MindHeader({ navigate }) {
  return (
    <div className="mind-header-wrapper">
      <div className="mind-header">
        <TextField
          variant="gray"
          afterIcon={SearchIcon}
          placeholder="Search for trees and nodes..."
        />
        <Button squared={true} onClick={async () => {
          const id = await handleCreateTree();
          console.log(id)
          navigate(`/mind/${id}`);
        }}>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
}

export function MindHome() {
  return <div>Default</div>;
}
