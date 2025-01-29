import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useState } from 'react';
import { usePost } from '@/hook/usePost';
import toast from 'react-hot-toast';

export function AddMainDialog({
  open,
  onClose,
  refetch,
}: {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { mutate, isPending: isLoading } = usePost('main/task');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setError(null); // Clear error when the user starts typing again
  };

  const handleSave = () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    mutate(
      { title },
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
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Main Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={handleNameChange}
              className="col-span-3"
              placeholder="Enter task title"
            />
            {error && (
              <p className="text-red-600 text-sm col-span-4">{error}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
