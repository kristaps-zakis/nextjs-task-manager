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
import { tasks } from '@/app/data/tasks-table';
import PaginationArea from './pagination/pagination-area';
import { useCheckedPrioritiesStore } from '@/app/hooks/useCheckedPrioritiesStore';
import { useCheckedStatusesStore } from '@/app/hooks/useCheckedStatusStore';

export default function TasksArea() {
  const { setCheckedPriorities, checkedPriorities } =
    useCheckedPrioritiesStore();
  const { setCheckedStatuses, checkedStatuses } = useCheckedStatusesStore();

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

            <DropdownViewColumns />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <TasksTable columns={tasksColumns} data={tasks} />
      </CardContent>
      <CardFooter>
        <PaginationArea />
      </CardFooter>
    </Card>
  );
}
