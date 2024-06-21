/** Core */
import { clsx, type ClassValue } from 'clsx';
import { eachDayOfInterval, isSameDay } from 'date-fns';
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

export function calculatePercentageChange(current: number, previous: number) {
  if (!previous) {
    return previous === current ? 0 : 100;
  }

  return ((current - previous) / previous) * 100;
}

export function fillMissingDays(
  activeDays: {
    date: Date;
    income: number;
    expenses: number;
  }[],
  startDate: Date,
  endDate: Date,
) {
  if (!activeDays.length) {
    return [];
  }

  const allDays = eachDayOfInterval({ start: startDate, end: endDate });

  const transactionsByDay = allDays.map((day) => {
    const dayWithTransacions = activeDays.find((activeDay) => isSameDay(activeDay.date, day));

    if (dayWithTransacions) {
      return dayWithTransacions;
    }

    return { date: day, income: 0, expenses: 0 };
  });

  return transactionsByDay;
}
