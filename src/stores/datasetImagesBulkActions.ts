import { create } from 'zustand';

interface ImageSelectionStore {
  selectedIds: string[];
  select: (id: string) => void;
  deselect: (id: string) => void;
  toggle: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
}

export const useImageSelectionStore = create<ImageSelectionStore>(
  (set, get) => ({
    selectedIds: [],

    select: (id) =>
      set((state) => ({
        selectedIds: state.selectedIds.includes(id)
          ? state.selectedIds
          : [...state.selectedIds, id],
      })),

    deselect: (id) =>
      set((state) => ({
        selectedIds: state.selectedIds.filter(
          (selectedId) => selectedId !== id
        ),
      })),

    toggle: (id) =>
      set((state) => ({
        selectedIds: state.selectedIds.includes(id)
          ? state.selectedIds.filter((selectedId) => selectedId !== id)
          : [...state.selectedIds, id],
      })),

    selectAll: (ids) =>
      set(() => ({
        selectedIds: [...new Set(ids)],
      })),

    clear: () =>
      set(() => ({
        selectedIds: [],
      })),

    isSelected: (id) => get().selectedIds.includes(id),
  })
);
