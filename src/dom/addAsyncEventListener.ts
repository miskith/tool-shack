/**
 * Listen to events fired on elements that may currently not exist in the DOM
 *
 * @param elementSelector Selector for element(s) to match event target
 * @param listeners List of event types and related callback(s)
 * @param acceptBubbling Boolean switch to allow bubbling or accept only direct element match
 * @returns void
 */
export const addAsyncEventListener = (
  elementSelector: string,
  listeners: Record<string, EventListener | EventListener[]>,
  acceptBubbling = true
): void => {
  for (let eventName in listeners) {
    const functionList = (
      listeners[eventName] instanceof Array ? listeners[eventName] : [listeners[eventName]]
    ) as EventListener[];

    functionList.forEach((fn: EventListener) => document.addEventListener(eventName, (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target) {
        return;
      }

      if (!acceptBubbling && target.matches(elementSelector)) {
        fn.call(this, event);
      } else if (acceptBubbling && target.closest(elementSelector)) {
        fn.call(this, event);
      }
    }));
  }
}
