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
