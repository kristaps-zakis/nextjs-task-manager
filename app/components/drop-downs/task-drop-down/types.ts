import { LucideIcon } from 'lucide-react';

// export type MenuItem = {
//   icon: LucideIcon;
//   label: string;
//   shortcut?: string | null;
// };

export type Kind = "edit" | "copy" | "favorite" | "delete";


export interface MenuItemType {
  icon: LucideIcon;
  label: string;
  kind: Kind;
  shortcut?: string | null;
};