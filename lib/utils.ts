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

export function parseFloatLocale(value: string) {
  return parseFloat(value.replace(',', '.'));
}

export function toFixedLocale(value: number, decimals = 2) {
  return value.toFixed(decimals).replace('.', ',');
}

export function convertAmounToMiliunits(amount: number) {
  return Math.round(amount * 1000);
}

export function convertAmounFromMiliunits(amount: number) {
  return amount / 1000;
}

export function formatCurrency(value: number) {
  return Intl
    .NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    .format(value);
}
