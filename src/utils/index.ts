import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number, locale = 'en-US', currency = 'USD'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(date: Date, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatDateRange(start: Date, end: Date, locale = 'en-US'): string {
  const startStr = formatDate(start, locale);
  const endStr = formatDate(end, locale);
  return `${startStr} - ${endStr}`;
}

export function debounce<T extends (...args: never[]) => void>(
  func: T,
  wait: number
): T {
  let timeout: ReturnType<typeof setTimeout>;
  
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

export function isDateInRange(date: Date, start?: Date, end?: Date): boolean {
  if (!start && !end) return true;
  if (start && date < start) return false;
  if (end && date > end) return false;
  return true;
}