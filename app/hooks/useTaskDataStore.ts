import { create } from 'zustand';
import { Task, tasks } from '@/app/data/tasks-table';

export interface useTasksDataStoreInterface {
  tasks: Task[] | null;
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  setTasks: (tasks: Task[]) => void;
  fetchTasks: () => Promise<void>;
}

export const useTasksDataStore = create<useTasksDataStoreInterface>((set) => ({
  tasks: null,
  selectedTask: null,

  setTasks: (tasksProp) => {
    set({ tasks: tasksProp });
  },

  setSelectedTask: (task) => {
    set({ selectedTask: task });
  },

  fetchTasks: async () => {
    try {
      console.log('Fetching data');

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          set({ tasks });
          resolve();
        }, 1000);
      });
    } catch (err) {
      console.log('Failed to fetch tasks', err);
      set({ tasks: null });
    }
  },
}));
