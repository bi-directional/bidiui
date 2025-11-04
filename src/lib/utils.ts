import { twMerge } from 'tailwind-merge';
import clsx, { type ClassArray } from 'clsx';

export const cn = (...inputs: ClassArray) => twMerge(clsx(inputs));

export const toPlain = (n: number | string) => {
  return typeof n === 'number'
    ? n.toLocaleString('fullwide', { useGrouping: false })
    : n;
};
