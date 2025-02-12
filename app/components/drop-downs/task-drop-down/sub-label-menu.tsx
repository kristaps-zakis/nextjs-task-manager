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

interface LabelSubMenuProps {
  value: string;
  onValueChange: (value: string) => void;
  onClickedLabelItem: (value: string) => void;
}

export function LabelSubMenu({
  value,
  onValueChange,
  onClickedLabelItem,
}: LabelSubMenuProps) {
  const handleValueChange = (newValue: string) => {
    onValueChange(newValue);
    onClickedLabelItem(newValue);
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Tag className="h-4 w-4 mr-2" />
        <span>Label</span>
      </DropdownMenuSubTrigger>

      <DropdownMenuPortal>
        <DropdownMenuSubContent className="poppins">
          <DropdownMenuRadioGroup
            value={value}
            onValueChange={handleValueChange}
          >
            {LABEL_OPTIONS.map((option) => (
              <DropdownMenuRadioItem key={option} value={option}>
                {option}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
