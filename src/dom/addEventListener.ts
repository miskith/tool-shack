/**
 * Add event listener(s) to one or more elements
 *
 * `listeners` is a map of event name to one handler or an array of handlers. This helper does not take `AddEventListenerOptions` and does not return cleanup.
 *
 * @param element One element or a list of elements
 * @param listeners Event name to handler or handler array
 * @returns void
 */
export const addEventListener = (
  element: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement> | HTMLCollectionOf<HTMLElement>,
  listeners: Record<
    string,
    EventListenerOrEventListenerObject | EventListenerOrEventListenerObject[]
  >,
): void => {
  const elementList = (
    element instanceof Array || element instanceof HTMLCollection || element instanceof NodeList
      ? Array.from(element)
      : [element]
  ) as HTMLElement[];

  elementList.forEach((targetElement: HTMLElement) => {
    for (const eventName in listeners) {
      const functionList = (
        listeners[eventName] instanceof Array ? listeners[eventName] : [listeners[eventName]]
      ) as EventListenerOrEventListenerObject[];

      functionList.forEach((listener: EventListenerOrEventListenerObject) =>
        targetElement.addEventListener(eventName, listener),
      );
    }
  });
};
