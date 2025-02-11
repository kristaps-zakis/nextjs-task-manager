'use client';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import {} from '@radix-ui/react-select';

export default function PaginationSelection() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Rows Per Page</span>

      <Select>
        <SelectTrigger className="w-[90px]">
          <SelectValue placeholder="4" />
        </SelectTrigger>
        <SelectContent>
          {[4, 6, 8, 10, 15, 20, 30].map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
