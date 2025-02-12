'use client';

import { useState, useEffect } from 'react';
import { Trash } from 'lucide-react';
import { BsThreeDots } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import { Task } from '@/app/data/tasks-table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { MENU_ITEMS } from './constants';
import { MenuItem } from './menu-items';
import { LabelSubMenu } from './sub-label-menu';
import { MenuItemType } from './types';
import { useTasksDataStore } from '@/app/hooks/useTaskDataStore';
import { Label, tasks } from '@/app/data/tasks-table';
import { toast } from '@/hooks/use-toast';

export function TaskDropDown({
  onOpen,
  onClose,
}: {
  onOpen: () => void;
  onClose: () => void;
}) {
  const [selectedLabel, setSelectedLabel] = useState('Bug');
  const { selectedTask, updateTasks } = useTasksDataStore();

  const [menuItemsArray, setmenuItemsArray] =
    useState<MenuItemType[]>(MENU_ITEMS);

  useEffect(() => {
    setmenuItemsArray((prev) =>
      prev.map((item) => {
        if (item.kind === 'favorite') {
          return {
            ...item,
            label: selectedTask?.isFavorite ? 'Unfavorite' : 'Favorite',
          };
        }

        return item;
      })
    );
  }, [selectedTask]);

  useEffect(() => {
    if (selectedTask) {
      setSelectedLabel(selectedTask.label);
    }
  }, [selectedTask]);

  const clickedLabelItem = async (newLabel: string) => {
    const validLabels: Label[] = ['Bug', 'Documentation', 'Feature'];

    if (!validLabels.includes(newLabel as Label)) {
      console.error(`The type ${newLabel} is incorrect`);
      return;
    }

    if (selectedTask && tasks) {
      const updatedTask: Task = {
        ...selectedTask,
        label: newLabel as Label,
      };

      const updatedTasksArray = tasks.map((task) =>
        task.taskId === selectedTask.taskId ? updatedTask : task
      );

      try {
        const result = await updateTasks(updatedTasksArray);

        toast({
          variant: result.success ? 'default' : 'destructive',
          title: result.success
            ? `[${selectedTask.taskId}] Updated Successfully!`
            : `[${selectedTask.taskId}] Update Failed!`,
          description: result.message,
        });
      } catch (err) {
        console.error('Failed to update tasks: ', err);
      }
    }
  };

  return (
    <DropdownMenu
      onOpenChange={(open: boolean) => (open ? onOpen() : onClose())}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <BsThreeDots />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 poppins">
        <DropdownMenuGroup>
          {menuItemsArray.map((item) => (
            <MenuItem
              key={item.label}
              kind={item.kind}
              Icon={item.icon}
              label={item.label}
              shortcut={item.shortcut as string}
            />
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <LabelSubMenu
            onClickedLabelItem={clickedLabelItem}
            value={selectedLabel}
            onValueChange={setSelectedLabel}
          />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <MenuItem
          Icon={Trash}
          label="Delete"
          kind={'delete'}
          shortcut=""
          className="text-red-500"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
