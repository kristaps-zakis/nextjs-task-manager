'use client';

import { useState } from 'react';
import { Trash } from 'lucide-react';
import { BsThreeDots } from 'react-icons/bs';
import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { MENU_ITEMS } from './constants';
import { MenuItem } from './menu-items';
import { LabelSubMenu } from './sub-label-menu';

export function TaskDropDown() {
  const [selectedLabel, setSelectedLabel] = useState('Bug');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <BsThreeDots />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-55 poppins">
        <DropdownMenuGroup>
          {MENU_ITEMS.map((item) => (
            <MenuItem
              key={item.label}
              Icon={item.icon}
              label={item.label}
              shortcut={item.shortcut as string}
            />
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <LabelSubMenu
            value={selectedLabel}
            onValueChange={setSelectedLabel}
          />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <MenuItem
          Icon={Trash}
          label="Delete"
          shortcut=""
          className="text-red-500"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
