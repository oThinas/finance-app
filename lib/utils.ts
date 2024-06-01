/** Core */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dismissButton(label?: string, onClick?: () => void) {
  return {
    cancel: {
      label: label ?? 'Dismiss',
      onClick: onClick ?? (() => { }),
    },
  };
}
