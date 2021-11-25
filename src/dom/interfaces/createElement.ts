export interface IExtendingElementProps {
  children?: HTMLElement[];
  listeners?: Record<string, EventListenerOrEventListenerObject | EventListenerOrEventListenerObject[]>;
}
