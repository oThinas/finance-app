/** Core */
import { create } from 'zustand';

interface NewTransactionSheetState {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

export const useNewTransactionSheet = create<NewTransactionSheetState>((set) => ({
  isOpen: false,
  onOpen() {
    set({ isOpen: true });
  },
  onClose() {
    set({ isOpen: false });
  },
}));
