import { useEffect, useState } from 'react';
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
import toast from 'react-hot-toast';
import { usePatch } from '@/hook/usePatch';
import { Task } from '@/type/task/type';

export function EditCardDialog({
  open,
  data,
  onClose,
  refetch,
}: {
  open: boolean;
  onClose: () => void;
  data?: Task;
  refetch: () => void;
}) {
  const [id, setId] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  // Update title when data changes
  useEffect(() => {
    if (data?.title) {
      setTitle(data.title);
    }
    if (data?.id) {
      setId(data.id);
    }
  }, [data]);

  const { mutate } = usePatch(`task/${id}`);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSave = () => {
    if (!title) {
      toast.error('Please enter a title');
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
        onError: () => {
          toast.error('Failed to create task');
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Title</DialogTitle>
          <DialogDescription>
            Make changes to your Title here. Click save when you are done.
            It&apos;s easy!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
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
