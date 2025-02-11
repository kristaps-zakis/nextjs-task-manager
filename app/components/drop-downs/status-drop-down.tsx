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

import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from 'lucide-react';

type Status = {
  value: string; // string
  label: string; // string
  icon: LucideIcon; // IconType
};

const statuses: Status[] = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: HelpCircle,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: Circle,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: ArrowUpCircle,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircle2,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: XCircle,
  },
];

export function StatusDropDowns() {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  );

  // console.log(selectedStatus);

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

              {/* Seperator */}
              <Separator
                orientation="vertical"
                className="h-6 border-1 border-gray-300"
              />

              {/* Badges */}
              <div className="flex items-center gap-2">
                <Badge variant={'secondary'}>Todo</Badge>
                <Badge variant={'secondary'}>Done</Badge>
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 poppons" side="bottom" align="center">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No status found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    className="flex justify-between"
                    onSelect={(value) => {
                      setSelectedStatus(
                        statuses.find((priority) => priority.value === value) ||
                          null
                      );
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox />

                      <status.icon />
                      <span>{status.label}</span>
                    </div>
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
