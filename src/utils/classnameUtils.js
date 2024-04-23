import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(classnames(inputs));
}
