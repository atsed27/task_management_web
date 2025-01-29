'use client';

import { useFetch } from '@/hook/useFetch';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Plus, Menu } from 'lucide-react';
import { AddMainDialog } from '../dialog/AddMainTask';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function Sidebar() {
  const [cardOpen, setIsCardOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const { data, refetch } = useFetch('main/task');

  const tasks = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  useEffect(() => {
    if (tasks.length > 0) {
      router.push(`/task/${tasks[0].id}`);
    }
  }, [tasks, router]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-12 bg-white shadow-md p-4 flex items-center justify-between z-50">
        <Button
          variant="ghost"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden"
        >
          <Menu />
        </Button>
        <h1 className="text-lg font-semibold">Task Manager</h1>
        <Avatar>
          <AvatarImage src="/profile.jpg" alt="User Profile" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </header>

      <nav
        className={cn(
          `fixed lg:relative z-40 w-72 bg-white shadow-md border-r p-4 transition-transform duration-300 ease-in-out h-[calc(100vh-3rem)] top-12`,
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="mb-2 text-xl font-semibold tracking-tight">Tasks</h2>
            <Button onClick={() => setIsCardOpen(true)}>
              <Plus />
            </Button>
          </div>

          <div className="flex flex-col space-y-2">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Link
                  key={task.id}
                  href={`/task/${task.id}`}
                  className="px-3 py-2 rounded-md hover:bg-gray-100 transition"
                >
                  {task.title}
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No tasks available</p>
            )}
          </div>
        </div>
      </nav>

      <AddMainDialog
        open={cardOpen}
        onClose={() => setIsCardOpen(false)}
        refetch={refetch}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
