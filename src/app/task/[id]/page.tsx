'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Plus } from 'lucide-react';
import { AddListDialog } from '@/components/dialog/AddTask';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditCardDialog } from '@/components/dialog/EditCard';
import { ADDCarDialog } from '@/components/dialog/AddCard';
import { CardData, Task } from '@/type/task/type';
import { DetailTask } from '@/components/dialog/detailTask';
import { useFetch } from '@/hook/useFetch';
import { useParams } from 'next/navigation';

function TaskList() {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cardOpen, setIsCardOpen] = useState(false);
  const [cardEdit, setIsCardEdit] = useState(false);
  const [taskDetails, setTaskDetails] = useState<Task | null>(null);

  const openDetailDialog = () => setIsDetailOpen(true);
  const closeDetailDialog = () => setIsDetailOpen(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const openCardDialog = () => {
    setIsCardOpen(true);
  };
  const closeCardDialog = () => setIsCardOpen(false);

  const openCardEdit = () => {
    setIsCardEdit(true);
  };
  const closeCardEdit = () => setIsCardEdit(false);

  const openTaskDetails = (task: Task) => {
    setTaskDetails(task);
    openDetailDialog();
  };

  const params = useParams();
  const id = params.id;
  // Get card data
  const { data, refetch } = useFetch(`main/card/${id}`);
  const card: CardData[] = Array.isArray(data) ? data : [];
  console.log(data);

  return (
    <div className="m-auto mx-4 flex items-start gap-4">
      <div className="flex items-center gap-4">
        {card.map((item) => (
          <Card key={item.id} className="w-[300px]">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                {item.tasks.map((task, index) =>
                  task ? (
                    <div
                      key={index}
                      className="my-2 w-full flex items-start justify-between bg-gray-100 gap-2 hover:bg-gray-300 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() => openTaskDetails(task)}
                    >
                      <h2 className="p-2 items-center"> {task.title}</h2>
                      <button onClick={openCardEdit}>
                        <Pencil />
                      </button>
                    </div>
                  ) : null,
                )}
              </div>
              <Button variant="outline" onClick={openCardDialog}>
                <Plus />
                Add Card
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex">
        <Button variant="outline" onClick={openDialog}>
          <Plus />
          Add other List
        </Button>
      </div>

      <AddListDialog
        open={isDialogOpen}
        onClose={closeDialog}
        refetch={refetch}
      />
      <ADDCarDialog open={cardOpen} onClose={closeCardDialog} />
      <EditCardDialog open={cardEdit} onClose={closeCardEdit} />
      <DetailTask
        open={isDetailOpen}
        onClose={closeDetailDialog}
        taskDetails={taskDetails}
      />
    </div>
  );
}

export default TaskList;
