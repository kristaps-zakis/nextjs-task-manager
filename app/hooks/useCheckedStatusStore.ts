import { create } from 'zustand';
import { Status } from '@/app/data/tasks-table';

interface useCheckedStatusesStoreInterface {
  checkedStatuses: Status[];
  setCheckedStatuses: (statusesProp: Status[]) => void;
}

export const useCheckedStatusesStore = create<useCheckedStatusesStoreInterface>(
  (set) => ({
    checkedStatuses: [],
    setCheckedStatuses: (statuses) => set({ checkedStatuses: statuses }),
  })
);
