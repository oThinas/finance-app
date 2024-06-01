/** Core */
import { ReactNode } from 'react';
import { toast as toastPrimitive } from 'sonner';

/** Libs */
import { dismissButton } from './utils';

function standard(message: ReactNode, id?: string) {
  toastPrimitive(message, { id, ...dismissButton() });
}

function success(message: ReactNode, id?: string) {
  toastPrimitive.success(message, { id, ...dismissButton() });
}

function error(message: ReactNode, id?: string) {
  toastPrimitive.error(message, { id, ...dismissButton() });
}

function description(message: ReactNode, description: ReactNode, id?: string) {
  toastPrimitive.message(message, { description, id, ...dismissButton() });
}

function info(message: ReactNode, id?: string) {
  toastPrimitive.info(message, { id, ...dismissButton() });
}

function warning(message: ReactNode, id?: string) {
  toastPrimitive.warning(message, { id, ...dismissButton() });
}

function loading(message: ReactNode, id: string) {
  toastPrimitive.loading(message, { id });
}

export const toast = {
  standard,
  success,
  error,
  description,
  info,
  warning,
  loading,
};
