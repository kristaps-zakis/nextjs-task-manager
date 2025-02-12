'use client';

import * as React from 'react';
import { BiColumns } from 'react-icons/bi';
import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Task } from '@/app/data/tasks-table';
import { Table } from '@tanstack/react-table';
import { useTasksDataStore } from '@/app/hooks/useTaskDataStore';

export function DropdownViewColumns({ table }: { table: Table<Task> }) {
  const { tasks } = useTasksDataStore();

  const columnsToHide = ['priority', 'status', 'createdAt'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={!tasks}
          variant="outline"
          className="h-11 px-8 poppins"
        >
          <BiColumns className="mr-2 h-4 w-4" />
          <span>View</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="poppins">
        {table
          .getAllColumns()
          .filter(
            (column) => column.getCanHide() && columnsToHide.includes(column.id)
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
