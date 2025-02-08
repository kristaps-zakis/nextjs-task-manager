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

export default function TasksArea() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SearchInput />
            <PriorityDropDowns />
            <Button variant={'ghost'} className="h-10">
              <span>Reset</span>
              <IoCloseSharp />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
