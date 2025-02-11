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

import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

import { Status, tasks } from '@/app/data/tasks-table';
import { useCheckedStatusesStore } from '@/app/hooks/useCheckedStatusStore';

import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from 'lucide-react';

type SingleStatusItem = {
  value: string;
  label: string;
  icon: LucideIcon;
  count: number;
};

// type Status = {
//   value: string; // string
//   label: string; // string
//   icon: LucideIcon; // IconType
// };

const statusesArray: SingleStatusItem[] = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: HelpCircle,
    count: 0,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: Circle,
    count: 0,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: ArrowUpCircle,
    count: 0,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircle2,
    count: 0,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: XCircle,
    count: 0,
  },
];

export function StatusDropDowns() {
  const [open, setOpen] = React.useState(false);

  const { checkedStatuses, setCheckedStatuses } = useCheckedStatusesStore();

  function updateTheCheckedStatus(label: string) {
    const validStatuses: Status[] = [
      'Backlog',
      'Canceled',
      'Done',
      'In Progress',
      'Todo',
    ];

    if (!validStatuses.includes(label as Status)) {
      console.error(`The type ${label} does not match the status types!`);
      return;
    }

    const castedStatus = label as Status;

    const newCheckedStatuses: Status[] = checkedStatuses.includes(
      castedStatus as Status
    )
      ? checkedStatuses.filter((s) => s !== castedStatus)
      : [...checkedStatuses, castedStatus];

    setCheckedStatuses(newCheckedStatuses);
  }

  const countStatuses: SingleStatusItem[] = React.useMemo(() => {
    if (!tasks) return statusesArray;

    return statusesArray.map((status) => {
      switch (status.value) {
        case 'backlog':
          return {
            ...status,
            count: tasks.filter((task) => task.status === 'Backlog').length,
          };
        case 'todo':
          return {
            ...status,
            count: tasks.filter((task) => task.status === 'Todo').length,
          };
        case 'canceled':
          return {
            ...status,
            count: tasks.filter((task) => task.status === 'Canceled').length,
          };
        case 'in progress':
          return {
            ...status,
            count: tasks.filter((task) => task.status === 'In Progress').length,
          };
        case 'done':
          return {
            ...status,
            count: tasks.filter((task) => task.status === 'Done').length,
          };

        default:
          return status;
      }
    });
  }, [tasks]);

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="h-10 justify-start border-dashed px-5"
          >
            <div className="flex items-center gap-4">
              {/* Status Label */}
              <div className="flex items-center gap-2">
                <GoPlusCircle />
                <span>Status</span>
              </div>

              {/* Badges */}

              {checkedStatuses?.length > 0 && (
                <>
                  {/* Seperator */}
                  <Separator
                    orientation="vertical"
                    className="h-6 border-1 border-gray-300"
                  />

                  {/* Badges */}
                  <div className="flex items-center gap-2">
                    {checkedStatuses.map((checkedStatus, index) => (
                      <Badge key={index} variant={'secondary'}>
                        {checkedStatus}
                      </Badge>
                    ))}
                  </div>
                </>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 poppons" side="bottom" align="center">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No status found.</CommandEmpty>
              <CommandGroup>
                {countStatuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    className="flex justify-between"
                    onSelect={() => updateTheCheckedStatus(status.label)}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={checkedStatuses.includes(
                          status.label as Status
                        )}
                      />

                      <status.icon />
                      <span>{status.label}</span>
                    </div>
                    <pre>{status.count}</pre>
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
