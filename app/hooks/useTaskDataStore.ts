import { create } from 'zustand';
import { Task, tasks } from '@/app/data/tasks-table';

export interface useTasksDataStoreInterface {
  tasks: Task[] | null;
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  setTasks: (tasks: Task[]) => void;
  fetchTasks: () => Promise<void>;
  updateTasks: (
    tasks: Task[],
    operation?: string | undefined
  ) => Promise<{ success: boolean; message: string }>;
  addTask: (task: Task) => Promise<{ success: boolean; message: string }>;
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
        }, 1);
      });
    } catch (err) {
      console.log('Failed to fetch tasks', err);
      set({ tasks: null });
    }
  },
  updateTasks: async (
    updateTasksArray: Task[],
    operation: string | undefined
  ) => {
    let successMessage = '';

    switch (operation) {
      case 'copy':
        successMessage = 'Task has been coppied successfully!';
        break;
      case 'delete':
        successMessage = 'Task has been deleted successfully!';
        break;
      case 'favorite':
        successMessage = 'Task is set as favorite successfully!';
        break;
      default:
        successMessage = 'Operation completed successfully';
        break;
    }

    try {
      const result = await new Promise<{ success: boolean; message: string }>(
        (resolve) => {
          setTimeout(() => {
            set({ tasks: updateTasksArray });

            resolve({
              success: true,
              message: successMessage,
            });
          }, 1);
        }
      );

      return result;
    } catch (error: unknown) {
      console.log(error);

      return { success: false, message: 'Something went wrong!' };
    }
  },
  addTask: async (task: Task) => {
    try {
      const result = await new Promise<{ success: boolean; message: string }>(
        (resolve) => {
          set((state) => {
            const updatedTasks = state.tasks ? [...state.tasks, task] : [task];
            return { tasks: updatedTasks };
          });
          resolve({
            success: true,
            message: 'Task succesfully added!',
          });
        }
      );

      return result;
    } catch (error: unknown) {
      console.log(error);
      return { success: false, message: 'Failed to add task!' };
    }
  },
}));
