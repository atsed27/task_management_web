'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useState } from 'react';
import Image from 'next/image';
import { Task } from '@/type/task/type';

export function DetailTask({
  open,
  onClose,
  taskDetails,
}: {
  open: boolean;
  onClose: () => void;
  taskDetails: Task | null;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openLargeImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeLargeImage = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[50%]">
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {taskDetails ? (
              <div className="flex">
                <div className="w-4/5">
                  <div>
                    <h3 className="font-semibold">Title:</h3>
                    <p>{taskDetails.title}</p>
                  </div>
                  {taskDetails.description && (
                    <div>
                      <h3 className="font-semibold mt-2">Description:</h3>
                      <p>{taskDetails.description}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold mt-2">Attachment:</h3>

                    <Image
                      src="/download.jfif"
                      alt="Task Attachment"
                      width={128}
                      height={128}
                      className="w-32 h-32 object-cover cursor-pointer"
                      onClick={() => openLargeImage('/download.jfif')}
                    />
                  </div>
                </div>
                <div className="w-1/5">
                  <Button>Attach Image</Button>
                </div>
              </div>
            ) : (
              <p>No task details available</p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => onClose()}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isModalOpen && selectedImage && (
        <Dialog open={isModalOpen} onOpenChange={closeLargeImage}>
          <DialogContent className="sm:max-w-full max-w-full w-full h-full p-0 bg-black bg-opacity-90">
            <DialogHeader>
              <DialogTitle>Large Image</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center items-center h-full">
              <Image
                src={selectedImage}
                alt="Large Image"
                width={800}
                height={800}
                className=" object-contain"
              />
            </div>
            <DialogFooter>
              <Button type="button" onClick={closeLargeImage}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
