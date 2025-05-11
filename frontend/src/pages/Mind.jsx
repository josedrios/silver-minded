import { Outlet } from 'react-router-dom';
import { Button, TextField, PlusIcon, SearchIcon } from '../components';

export function Mind() {

  return (
    <div>
      <MindHeader/>
      <Outlet />
    </div>
  );
}

function MindHeader() {
  return (
    <div className="mind-header-wrapper">
      <div className="mind-header">
        <TextField
          variant="gray"
          afterIcon={SearchIcon}
          placeholder="Search for trees and nodes..."
        />
        <Button squared={true}>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
}

export function MindHome() {
  return (
    <div>Default</div>
  )
}
