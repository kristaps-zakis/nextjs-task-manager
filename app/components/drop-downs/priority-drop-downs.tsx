'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { GoPlusCircle } from 'react-icons/go';
import { Checkbox } from '@/components/ui/checkbox';
import { IoMdArrowUp } from 'react-icons/io';
import { IoArrowBack, IoArrowDown } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';

import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCheckedPrioritiesStore } from '@/app/hooks/useCheckedPrioritiesStore';

import { Priority, tasks } from '@/app/data/tasks-table';

type SinglePriorityItem = {
  value: string;
  label: string;
  icon: IconType;
  count: number;
};

const prioritiesArray: SinglePriorityItem[] = [
  {
    value: 'high',
    label: 'High',
    icon: IoMdArrowUp,
    count: 0,
  },
  {
    value: 'medium',
    label: 'Medium',
    icon: IoArrowBack,
    count: 0,
  },
  {
    value: 'low',
    label: 'Low',
    icon: IoArrowDown,
    count: 0,
  },
];

export default function PriorityDropDowns() {
  const [open, setOpen] = React.useState(false);

  const { checkedPriorities, setCheckedPriorities } =
    useCheckedPrioritiesStore();

  console.log(checkedPriorities);

  // fucntion to update the array when a priority is checked
  function updateTheSelection(label: string) {
    // this code will safely take the value from string to priority type
    // to safely cast it down below, and avoid using a type that is not defined

    // valid priorities
    const validPriorities: Priority[] = ['Low', 'Medium', 'High'];

    if (!validPriorities.includes(label as Priority)) {
      console.error('Invalid priority');
      return;
    }

    const castedPriority = label as Priority;

    const newCheckedPriorities = checkedPriorities.includes(castedPriority)
      ? checkedPriorities.filter((p) => p !== castedPriority)
      : [...checkedPriorities, castedPriority];

    setCheckedPriorities(newCheckedPriorities);
  }

  // this useMemo hook is going to execute every time the tasks is updated
  const priorityCount: SinglePriorityItem[] = React.useMemo(() => {
    // if the tasks is null, return statusesArray
    if (!tasks) return prioritiesArray;

    const countByLow = tasks?.filter((task) => task.priority === 'Low').length;
    const countByMedium = tasks?.filter(
      (task) => task.priority === 'Medium'
    ).length;
    const countByHigh = tasks?.filter(
      (task) => task.priority === 'High'
    ).length;

    return prioritiesArray.map((priority) => {
      switch (priority.value) {
        case 'low':
          return { ...priority, count: countByLow };
        case 'medium':
          return { ...priority, count: countByMedium };
        case 'high':
          return { ...priority, count: countByHigh };
        default:
          return priority;
      }
    });
  }, [tasks]);

  return (
    <div className="flex intems-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="h-10 justify-start border-dashed px-5"
          >
            <div className="flex items-center gap-4">
              {/* Priority Label */}
              <div className="flex items-center gap-2">
                <GoPlusCircle />
                <span>Priority</span>
              </div>

              {checkedPriorities?.length > 0 && (
                <>
                  {/* Seperator */}
                  <Separator
                    orientation="vertical"
                    className="h-6 border-1 border-gray-300"
                  />

                  {/* Badges */}
                  <div className="flex items-center gap-2">
                    {checkedPriorities.map((checkedPriority, index) => (
                      <Badge key={index} variant={'secondary'}>
                        {checkedPriority}
                      </Badge>
                    ))}
                  </div>
                </>
              )}
            </div>
          </Button>
        </PopoverTrigger>

        {/* Popover Content */}
        <PopoverContent
          className="p-0 poppins w-52"
          side="bottom"
          align="center"
        >
          {/* Command component */}
          <Command>
            {/* Command input */}
            <CommandInput placeholder="Change Priority..." />

            {/* Command List */}
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {priorityCount.map((priority) => (
                  <CommandItem
                    key={priority.value}
                    value={priority.value}
                    className="flex justify-between"
                    onSelect={() => updateTheSelection(priority.label)}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={checkedPriorities.includes(
                          priority.label as Priority
                        )}
                      />
                      <priority.icon />
                      <span>{priority.label}</span>
                    </div>
                    <span>{priority.count}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
