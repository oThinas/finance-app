/** Core */
import { create } from 'zustand';

interface OpenTransactionSheetState {
  id?: string;
  isOpen: boolean;
  onOpen(id: string): void;
  onClose(): void;
}

export const useOpenTransactionSheet = create<OpenTransactionSheetState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen(id: string) {
    set({ isOpen: true, id });
  },
  onClose() {
    set({ isOpen: false, id: undefined });
  },
}));
