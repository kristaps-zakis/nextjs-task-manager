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

import { Task } from '@/app/data/tasks-table';

import { Controller, useFormContext } from 'react-hook-form';
import { TaskFormData } from '../task-dialog-schema';

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
  const { control } = useFormContext<TaskFormData>();

  return (
    <div className="flex flex-col gap-2">
      <Label className="opacity-75 text-sm font-medium">Task Label</Label>
      <Controller
        name="label"
        defaultValue={'Bug'}
        control={control}
        render={({ field }) => {
          return (
            <Select
              value={field.value}
              onValueChange={(value: TaskFormData['label']) =>
                field.onChange(value)
              }
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
          );
        }}
      ></Controller>
    </div>
  );
}
