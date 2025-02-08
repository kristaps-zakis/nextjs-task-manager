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

export default function TasksArea() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SearchInput />

            <StatusDropDowns />

            <PriorityDropDowns />

            <Button variant={'ghost'} className="h-10">
              <span>Reset</span>
              <IoCloseSharp />
            </Button>

            <DropdownViewColumns />
          </div>
        </div>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
