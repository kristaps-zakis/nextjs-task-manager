import { LucideIcon } from 'lucide-react';

export type MenuItem = {
  icon: LucideIcon;
  label: string;
  shortcut?: string | null;
};
