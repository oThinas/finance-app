/** Core */
import { create } from 'zustand';

interface OpenCategorySheetState {
  id?: string;
  isOpen: boolean;
  onOpen(id: string): void;
  onClose(): void;
}

export const useOpenCategorySheet = create<OpenCategorySheetState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen(id: string) {
    set({ isOpen: true, id });
  },
  onClose() {
    set({ isOpen: false, id: undefined });
  },
}));
