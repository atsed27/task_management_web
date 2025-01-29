'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { usePost } from '@/hook/usePost';
import toast from 'react-hot-toast';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function AddDetails({
  open,
  onClose,
  refetch,
  selectedCardId,
  refecheSubTask,
}: {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
  refecheSubTask: () => void;
  selectedCardId: string | null;
}) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Pending'); // Default status to 'Pending'

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  const { mutate } = usePost(`task/subtask`);

  const handleSave = () => {
    if (!title || !status) {
      toast.error('Please provide both title and status');
      return;
    }

    mutate(
      { title, task_id: selectedCardId, status },
      {
        onSuccess: () => {
          toast.success('Subtask created successfully!');
          refetch();
          refecheSubTask();
          setTitle('');
          setStatus('Pending');
          onClose();
        },
        onError: (err) => {
          toast.error('Failed to create subtask');
          console.error('Failed to create subtask:', err);
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
            Add details for the new subtask. You can assign a status as well.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Sub Task Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={handleNameChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
