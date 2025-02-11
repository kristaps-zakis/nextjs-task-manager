import { FilterFn } from '@tanstack/react-table';
import { Task } from '@/app/data/tasks-table';

export const titleFilter: FilterFn<Task> = (row, _, filterValue) => {
  const title: string = row.getValue('title') || '';
  const query = String(filterValue).toLocaleLowerCase();
  return title.toLocaleLowerCase().includes(query);
};
