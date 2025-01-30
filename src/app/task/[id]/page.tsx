'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Plus } from 'lucide-react';
import { AddListDialog } from '@/components/dialog/AddTask';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditCardDialog } from '@/components/dialog/EditCard';
import { AddCardDialog } from '@/components/dialog/AddCard';
import { CardData, Task } from '@/type/task/type';
import { DetailTask } from '@/components/dialog/detailTask';
import { useFetch } from '@/hook/useFetch';
import { useParams } from 'next/navigation';

function TaskList() {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cardOpen, setIsCardOpen] = useState(false);
  const [cardEdit, setIsCardEdit] = useState(false);
  const [Taskid, setTaskId] = useState<Task>();
  const [taskDetails, setTaskDetails] = useState<Task | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const openDetailDialog = () => setIsDetailOpen(true);
  const closeDetailDialog = () => setIsDetailOpen(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const openCardDialog = (cardId: string) => {
    setSelectedCardId(cardId);
    setIsCardOpen(true);
  };
  const closeCardDialog = () => setIsCardOpen(false);
  const closeCardEdit = () => setIsCardEdit(false);

  const openTaskDetails = (task: Task) => {
    setTaskDetails(task);
    openDetailDialog();
  };
  const openTaskEdit = (data: Task) => {
    setTaskId(data);
    setIsCardEdit(true);
  };

  const params = useParams();
  const id = params.id;
  const { data, refetch } = useFetch(`main/card/${id}`);
  const card: CardData[] = Array.isArray(data) ? data : [];

  return (
    <>
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="m-auto mx-4 flex items-start gap-4">
        <div className="flex gap-4">
          {card.map((item) => (
            <Card key={item.id} className="w-[300px]">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  {item.tasks
                    .filter(
                      (task) =>
                        task &&
                        (selectedStatus === 'All' ||
                          task.status === selectedStatus),
                    )
                    .map(
                      (task, index) =>
                        task && (
                          <div key={index} className="flex items-center">
                            <div
                              key={index}
                              className="my-2 w-full flex items-start justify-between bg-gray-100 gap-2 hover:bg-gray-300 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer"
                              onClick={() => openTaskDetails(task)}
                            >
                              <h2 className="p-2 items-center">
                                {' '}
                                {task.title}
                              </h2>
                            </div>
                            <div>
                              <button onClick={() => openTaskEdit(task)}>
                                <Pencil />
                              </button>
                            </div>
                          </div>
                        ),
                    )}
                </div>
                <Button
                  variant="outline"
                  onClick={() => openCardDialog(item.id)}
                >
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
        <AddCardDialog
          open={cardOpen}
          onClose={closeCardDialog}
          refetch={refetch}
          cardId={selectedCardId}
        />
        <EditCardDialog
          data={Taskid}
          refetch={refetch}
          open={cardEdit}
          onClose={closeCardEdit}
        />
        <DetailTask
          open={isDetailOpen}
          onClose={closeDetailDialog}
          taskDetails={taskDetails}
          refetch={refetch}
        />
      </div>
    </>
  );
}

export default TaskList;
