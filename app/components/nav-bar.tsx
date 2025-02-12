'use client';

import { ListTodo } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ModeToggle } from '../menu-toggle';
import { Button } from '@/components/ui/button';
import TaskDialog from './tasks-dialog/task-dialog';

export default function Navbar() {
  const { theme } = useTheme();

  const bgColor = theme === 'dark' ? 'bg--black border-t' : 'bg-white';

  return (
    <div
      className={`poppins relative w-full h-[92px] overflow-hidden flex justify-between items-center px-6 border-b ${bgColor}`}
    >
      <AppNameLogo />

      <div className="flex items-center gap-3 justify-center">
        <TaskDialog />
        <ModeToggle />
      </div>
    </div>
  );
}

export function AppNameLogo() {
  return (
    <header className="flex items-center gap-2 left-10 top-8">
      <div className="size-9 bg-primary rounded-md flex justify-center items-center">
        <ListTodo className="text-white text-lg" area-hidden="true" />
      </div>

      <h1 className="font-semibold text-2xl font-poppoins max-md:hidden">
        Task <span className="font-normal text-primary">Board</span>
      </h1>
    </header>
  );
}
