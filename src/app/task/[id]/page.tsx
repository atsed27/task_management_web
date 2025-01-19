'use client';

import React, { useState } from 'react';
//import { Data } from '@/constants/data';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AddListDialog } from '@/components/dialog/AddTask';
function TaskList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  return (
    <div className="m-auto mx-4 flex items-center gap-4">
      <div></div>
      <div className=" flex">
        <Button variant="outline" onClick={openDialog}>
          <Plus />
          Add other List
        </Button>
      </div>

      <AddListDialog open={isDialogOpen} onClose={closeDialog} />
    </div>
  );
}

export default TaskList;
