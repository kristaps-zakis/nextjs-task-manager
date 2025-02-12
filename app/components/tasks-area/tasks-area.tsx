import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SearchInput from './search-input';
import { IoCloseSharp } from 'react-icons/io5';
import PriorityDropDowns from '../drop-downs/priority-drop-downs';
import { StatusDropDowns } from '../drop-downs/status-drop-down';
import { DropdownViewColumns } from '../drop-downs/view-columns-drop-down';
import { TasksTable } from './tasks-table';
import { tasksColumns } from './tasks-columns';
// import { tasks } from '@/app/data/tasks-table';
import PaginationArea from './pagination/pagination-area';
import { useCheckedPrioritiesStore } from '@/app/hooks/useCheckedPrioritiesStore';
import { useCheckedStatusesStore } from '@/app/hooks/useCheckedStatusStore';

import { useTasksDataStore } from '@/app/hooks/useTaskDataStore';
import TableSkeleton from './TableSkeleton';
import { useQueryStore } from '@/app/hooks/useQueryStore';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { statusFilter } from './filters/statusFilters';
import { titleFilter } from './filters/titleFilter';
import { priorityFilter } from './filters/priorityFilters';

import { useState, useEffect } from 'react';

export default function TasksArea() {
  const { setCheckedPriorities, checkedPriorities } =
    useCheckedPrioritiesStore();
  const { setCheckedStatuses, checkedStatuses } = useCheckedStatusesStore();

  const { tasks } = useTasksDataStore();
  const { query } = useQueryStore();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data: tasks || [],
    columns: tasksColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
    filterFns: { titleFilter, priorityFilter, statusFilter },
  });

  useEffect(() => {
    const newFilters: ColumnFiltersState = [];

    if (query) {
      newFilters.push({ id: 'title', value: query });
    }

    if (checkedPriorities.length > 0) {
      newFilters.push({ id: 'priority', value: checkedPriorities });
    }

    if (checkedStatuses.length > 0) {
      newFilters.push({ id: 'status', value: checkedStatuses });
    }

    setColumnFilters(newFilters);
  }, [query, checkedPriorities, checkedStatuses]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SearchInput />

            <StatusDropDowns />

            <PriorityDropDowns />

            {(checkedPriorities.length > 0 || checkedStatuses.length > 0) && (
              <Button
                variant={'ghost'}
                className="h-10"
                onClick={() => {
                  setCheckedPriorities([]);
                  setCheckedStatuses([]);
                }}
              >
                <span>Reset</span>
                <IoCloseSharp />
              </Button>
            )}

            <DropdownViewColumns table={table} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!tasks ? (
          <>
            <TableSkeleton />
          </>
        ) : (
          <TasksTable table={table} columns={tasksColumns} />
        )}
      </CardContent>
      <CardFooter>
        <PaginationArea />
      </CardFooter>
    </Card>
  );
}
