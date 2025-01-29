'use client';

import { Button } from '@/components/ui/button';

import { useState } from 'react';
import { usePost } from '@/hook/usePost';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function AddDetails({
  open,
  onClose,
  refetch,
  selectedCardId,
}: {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
  selectedCardId: string | null;
}) {
  const [title, setTitle] = useState('');

  const params = useParams();
  const id = params.id;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const { mutate } = usePost(`task/subtask`);

  const handleSave = () => {
    console.log(id);
    mutate(
      { title, task_id: selectedCardId },
      {
        onSuccess: () => {
          toast.success('Task created successfully!');
          refetch();
          setTitle('');
          onClose();
        },
        onError: (err) => {
          toast.error('Failed to create task');
          console.error('Failed to create task:', err);
          onClose();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Sub Task</DialogTitle>
          <DialogDescription>
            Add Details of Sub Task. It&apos;s easy!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Sub Task
            </Label>
            <Input
              id="tiltle"
              value={title}
              onChange={handleNameChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
