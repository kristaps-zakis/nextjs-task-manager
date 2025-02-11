'use client';

import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from '@/components/ui/input';

export default function TaskTitle() {
  return (
    <div className="flex flex-col gap-3">
      <Label className="opacity-75 text-sm font-medium">Task Title</Label>
      <Input placeholder="Jon Doe..." className="h-11" />
      <p className="text-red-500 text-sm">This is an error</p>
    </div>
  );
}
