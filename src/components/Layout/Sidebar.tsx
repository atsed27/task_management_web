'use client';

import { useFetch } from '@/hook/useFetch';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AddMainDialog } from '../dialog/AddMainTask';
import { mainTask } from '@/type/task/type';

export default function Sidebar() {
  const [cardOpen, setIsCardOpen] = useState(false);
  const handleAdd = () => {
    setIsCardOpen(true);
  };
  const closeCardDialog = () => setIsCardOpen(false);
  const { data, refetch } = useFetch('main/task'); // Fetch tasks
  const tasks: mainTask[] = Array.isArray(data) ? data : [];

  return (
    <nav
      className={cn(
        `relative hidden h-screen w-72 overflow-y-auto border-r pt-16 lg:block`,
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1 ">
            <div className="flex items-center justify-between">
              <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
                Tasks
              </h2>
              <Button onClick={handleAdd}>
                <Plus />
              </Button>
            </div>
            <div className="flex items-stretch flex-col">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <Link key={task.id} href={`/task/${task.id}`}>
                    {task.title}
                  </Link>
                ))
              ) : (
                <p>No tasks available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <AddMainDialog
        open={cardOpen}
        onClose={closeCardDialog}
        refetch={refetch}
      />
    </nav>
  );
}
