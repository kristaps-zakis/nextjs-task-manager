export type Label =
  | 'Bug'
  | 'Feature'
  | 'Enhancement'
  | 'Documentation'
  | 'Other';
export type Status = 'Backlog' | 'Todo' | 'In Progress' | 'Done' | 'Canceled';
export type Priority = 'Low' | 'Medium' | 'High';

// export type Single

export type Task = {
  taskId: string;
  title: string;
  label: Label;
  isFavorite: boolean;
  priority: Priority;
  status: Status;
  createdAt: Date;
};

export const tasks: Task[] = [
  {
    taskId: 'Task-001',
    title: 'Fix login bug',
    label: 'Bug',
    isFavorite: true,
    priority: 'High',
    status: 'In Progress',
    createdAt: new Date('2024-01-21T00:00:00Z'),
  },
  {
    taskId: '2',
    title: 'Add dark mode feature',
    label: 'Feature',
    isFavorite: false,
    priority: 'Medium',
    status: 'Todo',
    createdAt: new Date('2024-01-02T00:00:00Z'),
  },
  {
    taskId: '3',
    title: 'Update documentation',
    label: 'Documentation',
    isFavorite: false,
    priority: 'Low',
    status: 'Backlog',
    createdAt: new Date('2024-01-03T00:00:00Z'),
  },
  {
    taskId: '4',
    title: 'Implement new feature',
    label: 'Feature',
    isFavorite: false,
    priority: 'Medium',
    status: 'Backlog',
    createdAt: new Date('2024-01-04T00:00:00Z'),
  },
];
