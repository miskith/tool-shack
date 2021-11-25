import { IExtendingElementProps } from './interfaces/createElement';

export const createElement = <T = HTMLElement> (tagName: string, props?: Partial<T> & IExtendingElementProps): T => {
  const element: HTMLElement = document.createElement(tagName);

  if (props) {
    for (let key in props) {
      if (key==='children') {
        props.children!.forEach((child: HTMLElement) => element.appendChild(child));
      } else if (key==='listeners') {
        for (let eventName in props.listeners!) {
          const functionList = (
            props.listeners![eventName] instanceof Array ? props.listeners![eventName] : [props.listeners![eventName]]
          ) as EventListenerOrEventListenerObject[];

          functionList.forEach((fn: EventListenerOrEventListenerObject) => element.addEventListener(eventName, fn));
        }
      } else {
        (element as any)[key] = (props as any)[key];
      }
    }
  }

  return element as unknown as T;
};
