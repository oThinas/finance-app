/** Core */
import { ReactNode } from 'react';
import { toast as toastPrimitive } from 'sonner';

/** Libs */
import { dismissButton } from './utils';

function standard(message: ReactNode, id?: string | number) {
  return toastPrimitive(message, { id, ...dismissButton() });
}

function success(message: ReactNode, id?: string | number) {
  return toastPrimitive.success(message, { id, ...dismissButton() });
}

function error(message: ReactNode, id?: string | number) {
  return toastPrimitive.error(message, { id, ...dismissButton() });
}

function description(message: ReactNode, description: ReactNode, id?: string | number) {
  return toastPrimitive.message(message, { description, id, ...dismissButton() });
}

function info(message: ReactNode, id?: string | number) {
  return toastPrimitive.info(message, { id, ...dismissButton() });
}

function warning(message: ReactNode, id?: string | number) {
  return toastPrimitive.warning(message, { id, ...dismissButton() });
}

function loading(message: ReactNode, id?: string | number) {
  return toastPrimitive.loading(message, { id });
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
