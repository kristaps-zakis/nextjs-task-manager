import { FilterFn } from '@tanstack/react-table';
import { Task } from '@/app/data/tasks-table';

export const statusFilter: FilterFn<Task> = (row, columnId, filterValue) => {
  const status: string = row.getValue(columnId);

  return filterValue.includes(status);
};
