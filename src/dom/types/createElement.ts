import type { IExtendingElementProps } from '../interfaces/createElement.js';

export type TCreateElementProps<T extends HTMLElement> = Partial<
  Omit<T, 'children' | 'dataset' | 'style'>
> &
  IExtendingElementProps;

/**
 * Element created for a tag-name literal or an explicit element type.
 * Known tags resolve through `HTMLElementTagNameMap`; an explicit element type is used as-is.
 */
export type TCreateElementNode<T> = T extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[T]
  : T extends HTMLElement
    ? T
    : HTMLElement;

/** Blocks inference from a props object so the tag name or explicit type argument stays in control. */
type TNoInfer<T> = [T][T extends unknown ? 0 : never];

export type TCreateElementPropsFor<T> = TCreateElementProps<TNoInfer<TCreateElementNode<T>>>;
