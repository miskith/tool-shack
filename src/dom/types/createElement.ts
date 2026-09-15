import type { IExtendingElementProps } from '../interfaces/createElement.js';

export type TCreateElementProps<T extends HTMLElement> = Partial<
  Omit<T, 'children' | 'dataset' | 'style'>
> &
  IExtendingElementProps;
