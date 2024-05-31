import { create } from 'zustand';

interface NewAccountSheetState {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

export const useNewAccountSheet = create<NewAccountSheetState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
