/** Core */
import { create } from 'zustand';

interface NewCategorySheetState {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

export const useNewCategorySheet = create<NewCategorySheetState>((set) => ({
  isOpen: false,
  onOpen() {
    set({ isOpen: true });
  },
  onClose() {
    set({ isOpen: false });
  },
}));
