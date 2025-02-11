import { Copy, Edit2, Star } from 'lucide-react';
import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    icon: Edit2,
    label: 'Edit',
    shortcut: 'edit',
  },
  {
    icon: Copy,
    label: 'Make a Copy',
    shortcut: '',
  },
  {
    icon: Star,
    label: 'Favorite',
  },
];

export const LABEL_OPTIONS = [
  'Bug',
  'Feature',
  'Improvement',
  'Task',
  'Documentation',
];
