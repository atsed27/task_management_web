'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useState } from 'react';
import { usePost } from '@/hook/usePost';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';

export function AddListDialog({
  open,
  onClose,
  refetch,
}: {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}) {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { mutate } = usePost('main/card');
  const params = useParams();
  const id = params.id;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setError(null);
  };

  const handleSave = () => {
    if (!name.trim()) {
      setError('Please enter a list name');
      return;
    }

    mutate(
      { card: name, mainTask_id: id },
      {
        onSuccess: () => {
          toast.success('List created successfully!');
          refetch();
          setName('');
          onClose();
        },
        onError: (err) => {
          toast.error(err.message ?? 'Failed to create List');
          console.error('Failed to create List:', err);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add List</DialogTitle>
          <DialogDescription>
            Add List of Task Card. It&apos;s easy!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={handleNameChange}
              className="col-span-3"
              placeholder="Enter list name"
            />
            {error && (
              <p className="text-red-600 text-sm col-span-4">{error}</p>
            )}
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
