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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { z } from 'zod';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['Pending', 'In Progress', 'Completed'], {
    errorMap: () => ({ message: 'Invalid status' }),
  }),
});

export function AddCardDialog({
  open,
  onClose,
  refetch,
  cardId,
}: {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
  cardId: string | null;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    status: '',
  });

  const { mutate, isPending: isLoading } = usePost(`task/${cardId}`);

  const handleSave = () => {
    const formData = { title, description, status };

    const result = taskSchema.safeParse(formData);
    if (!result.success) {
      const newErrors = {
        title: '',
        description: '',
        status: '',
      };

      result.error.errors.forEach((err) => {
        if (err.path[0] === 'title') {
          newErrors.title = err.message;
        } else if (err.path[0] === 'description') {
          newErrors.description = err.message;
        } else if (err.path[0] === 'status') {
          newErrors.status = err.message;
        }
      });

      setErrors(newErrors);
      return;
    }

    mutate(formData, {
      onSuccess: () => {
        toast.success('Task created successfully!');
        refetch();
        setTitle('');
        setDescription('');
        setStatus('Pending');
        setErrors({ title: '', description: '', status: '' });
        onClose();
      },
      onError: (err) => {
        toast.error('Failed to create task');
        console.error('Failed to create task:', err);
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Create a new task with a title, description, and status.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Name
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              placeholder="Enter task name"
            />
            {errors.title && (
              <p className="text-red-600 text-sm col-span-4">{errors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              placeholder="Enter task description"
            />
            {errors.description && (
              <p className="text-red-600 text-sm col-span-4">
                {errors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select onValueChange={setStatus} value={status}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-red-600 text-sm col-span-4">{errors.status}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
