import { Copy, Edit2, Star } from 'lucide-react';
import { MenuItemType } from './types';

export const MENU_ITEMS: MenuItemType[] = [
  {
    icon: Edit2,
    label: 'Edit',
    shortcut: 'edit',
    kind: 'edit',
  },
  {
    icon: Copy,
    label: 'Make a Copy',
    shortcut: '',
    kind: 'copy',
  },
  {
    icon: Star,
    label: 'Favorite',
    kind: 'favorite',
  },
];

export const LABEL_OPTIONS = [
  'Bug',
  'Feature',
  'Improvement',
  'Task',
  'Documentation',
];
