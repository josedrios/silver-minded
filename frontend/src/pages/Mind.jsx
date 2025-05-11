import { useState } from 'react';
import { Button, TextField, PlusIcon, SearchIcon } from '../components';

export default function Mind() {

  return (
    <div>
      <MindHeader/>

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
