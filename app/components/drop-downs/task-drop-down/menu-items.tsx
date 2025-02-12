import { LucideIcon } from 'lucide-react';
import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { useTasksDataStore } from '@/app/hooks/useTaskDataStore';
import { handleMenuItemClick } from './utils';
import { useToast } from '@/hooks/use-toast';
import { Kind } from './types';

export function MenuItem({
  Icon,
  kind,
  label,
  shortcut,
  className,
}: {
  Icon: LucideIcon;
  kind: Kind;
  label: string;
  shortcut: string;
  className?: string;
}) {
  const { tasks, selectedTask, updateTasks } = useTasksDataStore();
  const { toast } = useToast();

  return (
    <DropdownMenuItem
      onClick={() =>
        handleMenuItemClick(kind, tasks, selectedTask, updateTasks, toast)
      }
    >
      <Icon className={`mr-2 h-4 w-4 ${className}`} />
      <span className={className}>{label}</span>
      {shortcut && (
        <DropdownMenuShortcut className={`${className}`}>
          {shortcut}
        </DropdownMenuShortcut>
      )}
    </DropdownMenuItem>
  );
}
