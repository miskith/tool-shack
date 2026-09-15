/**
 * Dispatch a native Event on an element
 *
 * @param element Element to dispatch on
 * @param eventType Event type name
 * @returns Result of `dispatchEvent`
 */
export const fireEvent = (element: HTMLElement, eventType: string): boolean =>
  element.dispatchEvent(new Event(eventType));
