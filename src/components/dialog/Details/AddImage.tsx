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
import Image from 'next/image';

export function AddImage({
  open,
  onClose,
  refetch,
  selectedCardId,
  refachfile,
}: {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
  selectedCardId: string | null;
  refachfile: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { mutate: PostMutate, isPending: isLoading } = usePost(
    `file/${selectedCardId}`,
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      if (selectedFile.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setPreview(null);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);

      if (droppedFile.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(droppedFile));
      } else {
        setPreview(null);
      }
    }
  };

  const handleSave = async () => {
    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('task_id', selectedCardId || '');
    formData.append('file', file);

    try {
      await new Promise((resolve, reject) => {
        PostMutate(formData, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      toast.success('File uploaded successfully!');
      refetch();
      refachfile();
      setPreview(null);
      onClose();
    } catch (error) {
      toast.error('Failed to upload the file.');
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Attach an image or document to the task.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div
            className="grid grid-cols-4 items-center gap-4"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              border: '2px dashed #ccc',
              padding: '1rem',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            <Label htmlFor="file" className="text-right">
              File
            </Label>
            <Input
              id="file"
              type="file"
              accept="*/*"
              onChange={handleFileChange}
              className="col-span-3"
            />
          </div>

          {file && (
            <div className="flex justify-center mt-2">
              {preview ? (
                <Image
                  src={preview}
                  alt="Selected File"
                  width={100}
                  height={100}
                  className="rounded-md object-cover border"
                />
              ) : (
                <p className="text-sm text-gray-600">{file.name}</p>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
