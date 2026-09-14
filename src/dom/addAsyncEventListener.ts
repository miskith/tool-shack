/**
 * Listen to events fired on elements that may currently not exist in the DOM
 *
 * @param elementSelector Selector for element(s) to match event target
 * @param listeners List of event types and related callback(s)
 * @param acceptBubbling Boolean switch to allow bubbling or accept only direct element match
 * @returns Cleanup function to remove the delegated listeners
 */
export const addAsyncEventListener = (
  elementSelector: string,
  listeners: Record<string, EventListener | EventListener[]>,
  acceptBubbling = true,
): (() => void) => {
  const removals: (() => void)[] = [];

  for (const eventName in listeners) {
    const functionList = (
      listeners[eventName] instanceof Array ? listeners[eventName] : [listeners[eventName]]
    ) as EventListener[];

    functionList.forEach((listener: EventListener) => {
      const handleEvent = (event: Event): void => {
        const target = event.target as HTMLElement;
        if (!target) {
          return;
        }

        if (!acceptBubbling && target.matches(elementSelector)) {
          listener(event);
        } else if (acceptBubbling && target.closest(elementSelector)) {
          listener(event);
        }
      };

      document.addEventListener(eventName, handleEvent);
      removals.push(() => {
        document.removeEventListener(eventName, handleEvent);
      });
    });
  }

  return () => {
    removals.forEach((remove) => {
      remove();
    });
  };
};
