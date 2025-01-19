'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <nav
      className={cn(
        `relative hidden h-screen w-72 overflow-y-auto border-r pt-16 lg:block`,
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Task Management
            </h2>
            <div className="flex items-stretch flex-col">
              <Link href={'/task/1'}>Task 1</Link>
              <Link href={'/task/erp'}>Task 2</Link>
              <Link href={'/'}>Task 3</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
