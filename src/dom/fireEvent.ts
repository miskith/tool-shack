/**
 * Manually fire event on Node element
 *
 * @param element Node element on which should be fired event
 * @param eventType Type name of event that should be fired
 * @returns Result of the action
 */
export const fireEvent = (element: HTMLElement, eventType: string): boolean => element.dispatchEvent(new Event(eventType));
