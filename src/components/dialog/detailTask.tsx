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
import { file, Task } from '@/type/task/type';
import { AddDetails } from './Details/AddDetails';
import { AddImage } from './Details/AddImage';
import { useFetch } from '@/hook/useFetch';

export function DetailTask({
  open,
  onClose,
  taskDetails,
  refetch,
}: {
  open: boolean;
  onClose: () => void;
  taskDetails: Task | null;
  refetch: () => void;
}) {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const openLargeImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeLargeImage = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const openDialog = (id: string) => {
    setSelectedCardId(id);
    setIsDialogOpen(true);
  };

  const closeDialog = () => setIsDialogOpen(false);

  const openImage = (id: string) => {
    setSelectedCardId(id);
    setIsImageOpen(true);
  };
  const closeImage = () => setIsImageOpen(false);

  console.log('taskDetails', taskDetails);
  const { data, refetch: refachfile } = useFetch(`file/${taskDetails?.id}`);

  const files: file[] = Array.isArray(data) && data.length > 0 ? data : [];

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[50%]">
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {taskDetails ? (
              <div className="flex flex-col">
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Title:</h3>
                    <p>{taskDetails.title}</p>
                  </div>

                  {taskDetails.status && (
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold mt-2">Status:</h3>
                      <p>{taskDetails.status}</p>
                    </div>
                  )}
                  {taskDetails.description && (
                    <div>
                      <h3 className="font-semibold mt-2">Description:</h3>
                      <p>{taskDetails.description}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold mt-2">Attachments:</h3>
                    {files && files.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {files.map((file) => (
                          <div
                            key={file.id}
                            className="flex flex-col items-center"
                          >
                            {file.file_url.endsWith('.jpg') ||
                            file.file_url.endsWith('.jpeg') ||
                            file.file_url.endsWith('.png') ||
                            file.file_url.endsWith('.gif') ? (
                              <Image
                                src={file.file_url}
                                alt="Task Attachment"
                                width={128}
                                height={128}
                                className="w-32 h-32 object-cover cursor-pointer"
                                onClick={() => openLargeImage(file.file_url)}
                              />
                            ) : (
                              <a
                                href={file.file_url}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                              >
                                Download Attachment
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No attachments available.</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold">Subtasks:</h3>
                  {taskDetails.subtasks && taskDetails.subtasks.length > 0 ? (
                    <ul className="mt-2 space-y-2">
                      {taskDetails.subtasks.map((subtask) => (
                        <li
                          key={subtask.id}
                          className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                        >
                          <div>
                            <p className="font-medium">{subtask.title}</p>
                            <p className="text-sm text-gray-500">
                              Status: {subtask.status}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No subtasks available.</p>
                  )}
                </div>

                <div className="flex gap-4 mt-4">
                  <Button onClick={() => openDialog(taskDetails.id)}>
                    Add Subtask
                  </Button>
                  <Button onClick={() => openImage(taskDetails.id)}>
                    Attach Image
                  </Button>
                </div>
              </div>
            ) : (
              <p>No task details available</p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" onClick={onClose}>
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
            <div className="flex justify-center items-center h-full relative">
              <Image
                src={selectedImage}
                alt="Large Image"
                width={800}
                height={800}
                className="object-contain"
              />
              <Button
                onClick={closeLargeImage}
                className="absolute top-4 right-4 bg-white text-black p-2 rounded-full"
              >
                Close
              </Button>
            </div>
            <DialogFooter>
              <Button type="button" onClick={closeLargeImage}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Subtask Dialog */}
      <AddDetails
        selectedCardId={selectedCardId}
        open={isDialogOpen}
        onClose={closeDialog}
        refetch={refetch}
      />
      <AddImage
        selectedCardId={selectedCardId}
        open={isImageOpen}
        onClose={closeImage}
        refetch={refetch}
        refachfile={refachfile}
      />
    </>
  );
}
