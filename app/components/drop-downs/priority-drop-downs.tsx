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

type Status = {
  value: string;
  label: string;
  icon: IconType;
};

const statuses: Status[] = [
  {
    value: 'high',
    label: 'High',
    icon: IoMdArrowUp,
  },
  {
    value: 'medium',
    label: 'Medium',
    icon: IoArrowBack,
  },
  {
    value: 'low',
    label: 'Low',
    icon: IoArrowDown,
  },
];

export default function PriorityDropDowns() {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  );

  // console.log(selectedStatus);

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

              {/* Seperator */}
              <Separator
                orientation="vertical"
                className="h-6 border-1 border-gray-300"
              />

              {/* Badges */}
              <div className="flex items-center gap-2">
                <Badge variant={'secondary'}>Low</Badge>
                <Badge variant={'secondary'}>Medium</Badge>
              </div>
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
                    <span>23</span>
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
