import type { IExtendingElementProps } from './interfaces/createElement.js';

/**
 * Method for creating Node element and assigning multiple parameters, event listeners & children in one method call
 *
 * @param tagName Node tag name
 * @param props List of attributes, event listeners or/and children to assign to the newly created element
 * @returns Resulting Node element
 */
export const createElement = <T = HTMLElement>(
  tagName: string,
  props?: Partial<Omit<T, 'children' | 'dataset' | 'style'>> & IExtendingElementProps,
): T => {
  const element: HTMLElement = document.createElement(tagName);

  if (props) {
    const propsRecord = props as Record<string, unknown>;

    for (const key in props) {
      const value = propsRecord[key];

      if (key === 'role') {
        element.setAttribute(key, value as string);
      } else if (key === 'aria') {
        for (const [ariaKey, ariaValue] of Object.entries(props.aria!)) {
          element.setAttribute(`aria-${ariaKey}`, ariaValue as string);
        }
      } else if (key === 'style') {
        Object.assign(element.style, props.style);
      } else if (key === 'children') {
        const fragment = document.createDocumentFragment();
        for (const child of props.children!) {
          if (typeof child === 'string') {
            fragment.appendChild(document.createTextNode(child));
          } else {
            fragment.appendChild(child);
          }
        }
        element.appendChild(fragment);
      } else if (key === 'listeners') {
        for (const eventName in props.listeners!) {
          const functionList = (
            props.listeners![eventName] instanceof Array
              ? props.listeners![eventName]
              : [props.listeners![eventName]]
          ) as EventListenerOrEventListenerObject[];

          functionList.forEach((listener: EventListenerOrEventListenerObject) =>
            element.addEventListener(eventName, listener),
          );
        }
      } else if (key === 'dataset') {
        Object.assign(element.dataset, props.dataset);
      } else {
        (element as unknown as Record<string, unknown>)[key] = value;
      }
    }
  }

  return element as unknown as T;
};
