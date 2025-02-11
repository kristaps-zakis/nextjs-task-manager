import { create } from 'zustand';

interface useQueryStorageInterface {
  query: string;
  setQuery: (query: string) => void;
}

export const useQueryStore = create<useQueryStorageInterface>((set) => ({
  query: '',
  setQuery: (query) => {
    set({ query: query });
  },
}));
