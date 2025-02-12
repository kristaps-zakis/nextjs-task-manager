'use client';

import { Priority, Status, Task } from '@/app/data/tasks-table';
import { Badge } from '@/components/ui/badge';
import { Column, ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from 'lucide-react';

import { IoMdArrowUp } from 'react-icons/io';
import { IoArrowBack } from 'react-icons/io5';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';

import { Star } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

import { ArrowUpDown } from 'lucide-react';
import { IoMdArrowDown } from 'react-icons/io';
import { GrHide } from 'react-icons/gr';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu';
import { useTasksDataStore } from '@/app/hooks/useTaskDataStore';
import { TaskDropDown } from '../drop-downs/task-drop-down/task-drop-down';

function renderStatusIcons(status: Status) {
  switch (status) {
    case 'Backlog':
      return HelpCircle;
    case 'Canceled':
      return XCircle;
    case 'Done':
      return CheckCircle2;
    case 'In Progress':
      return ArrowUpCircle;
    case 'Todo':
      return Circle;

    default:
      return null;
  }
}

function renderPriorityIcons(priority: Priority) {
  switch (priority) {
    case 'High':
      return IoArrowUp;
    case 'Medium':
      return IoArrowBack;
    case 'Low':
      return IoArrowDown;

    default:
      return null;
  }
}

function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
      ? 'nd'
      : day % 10 === 3 && day !== 13
      ? 'rd'
      : 'th';

  return `${day}${suffix} ${month} ${year}`;
}

type SortableHeaderProps = {
  column: Column<Task, unknown>;
  label: string;
};

const SortableHeader: React.FC<SortableHeaderProps> = ({ column, label }) => {
  const isSorted = column.getIsSorted();
  const SortingIcon =
    isSorted === 'asc'
      ? IoMdArrowUp
      : isSorted === 'desc'
      ? IoMdArrowDown
      : ArrowUpDown;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`flex items-start py-[14px] select-none cursor-pointer p-2 gap-1 ${
            isSorted && 'text-primary'
          }`}
          aria-label={`Sort by ${label}`}
        >
          {label}
          <SortingIcon className="w-4 h-4" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        side="bottom"
        className="poppins bg-red-600"
      >
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <IoMdArrowUp className="mr-2 w-4 h-4" />
          ASC
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <IoMdArrowDown className="mr-2 w-4 h-4" />
          DESC
        </DropdownMenuItem>
        {label !== 'Title' && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                column.toggleVisibility();
              }}
            >
              <GrHide className="mr-2 size-7 text-p[acity-90" />
              Hide
            </DropdownMenuItem>
          </>
        )}
        ;
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const tasksColumns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'taskId',
    header: 'Task',
  },
  {
    accessorKey: 'isFavorite',
    header: '',
    cell: ({ row }) => {
      const FavoriteIcon = row.original.isFavorite && Star;
      return FavoriteIcon && <FavoriteIcon size={14} />;
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <SortableHeader column={column} label="Title" />,
    cell: ({ row }) => {
      const taskLabel = row.original.label;
      const taskTitle = row.original.title;

      return (
        <div className="flex items-center gap-2">
          <Badge variant={'outline'}>{taskLabel}</Badge>
          <span>{taskTitle}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column} label="Status" />,
    cell: ({ row }) => {
      const StatusIcon = renderStatusIcons(row.original.status);
      const status = row.original.status;

      return (
        <div className="flex items-center gap-2 text-sm">
          {StatusIcon && (
            <StatusIcon size="17" className="text-gray-600 opacity-95" />
          )}
          <span>{status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => <SortableHeader column={column} label="Priority" />,
    cell: ({ row }) => {
      const PriorityIcon = renderPriorityIcons(row.original.priority);
      const priority = row.original.status;

      return (
        <div className="flex items-center gap-2 text-sm">
          {PriorityIcon && (
            <PriorityIcon size="17" className="text-gray-600 opacity-95" />
          )}
          <span>{priority}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <SortableHeader column={column} label="Created At" />
    ),
    cell: ({ row }) => {
      const date = row.original.createdAt;
      const formattedDate = formatDate(date);

      return formattedDate;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <ShowTaskDropDown task={row.original} />;
    },
  },
];

function ShowTaskDropDown({ task }: { task: Task }) {
  const { setSelectedTask } = useTasksDataStore();

  return (
    <TaskDropDown
      onOpen={() => setSelectedTask(task)}
      onClose={() => setSelectedTask(null)}
    />
  );
}