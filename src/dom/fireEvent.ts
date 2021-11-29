export const fireEvent = (element: HTMLElement, eventType: string): boolean => element.dispatchEvent(new Event(eventType));
