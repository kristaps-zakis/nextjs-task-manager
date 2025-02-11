'use client';

import { Label } from '@radix-ui/react-dropdown-menu';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Task } from '@/app/data/tasks-table';

type Priority = {
  value: Task['label'];
};

const statuses: Priority[] = [
  { value: 'Bug' },
  { value: 'Documentation' },
  { value: 'Feature' },
  { value: 'Other' },
];

export default function TaskLabels() {
  const [selectedPriority, setSelectedPriority] =
    useState<Task['label']>('Bug');

  return (
    <div className="flex flex-col gap-2">
      <Label className="opacity-75 text-sm font-medium">Task Label</Label>
      <Select
        value={selectedPriority}
        onValueChange={(value: Task['label']) => setSelectedPriority(value)}
      >
        <SelectTrigger className="w-full h-11">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent className="w-full h-11">
          <SelectGroup>
            {statuses.map((status, index) => (
              <SelectItem key={index} value={status.value}>
                <div className="flex items-center gap-2">
                  <span>{status.value}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
