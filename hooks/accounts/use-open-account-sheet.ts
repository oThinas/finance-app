/** Core */
import { create } from 'zustand';

interface OpenAccountSheetState {
  id?: string;
  isOpen: boolean;
  onOpen(id: string): void;
  onClose(): void;
}

export const useOpenAccountSheet = create<OpenAccountSheetState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen(id: string) {
    set({ isOpen: true, id });
  },
  onClose() {
    set({ isOpen: false, id: undefined });
  },
}));
