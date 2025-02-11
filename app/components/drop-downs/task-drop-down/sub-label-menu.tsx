'use clinet';

import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { LABEL_OPTIONS } from './constants';
import { Tag } from 'lucide-react';

export function LabelSubMenu({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Tag className="h-4 w-4 mr-2" />
        <span>Label</span>
      </DropdownMenuSubTrigger>

      <DropdownMenuPortal>
        <DropdownMenuSubContent className="poppins">
          <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
            {LABEL_OPTIONS.map((option) => (
              <DropdownMenuRadioItem
                key={option}
                value={option.toLocaleLowerCase()}
              >
                {option}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
