/**
 * Add event listener to listen to clicks outside of given element
 *
 * @param element Node element outside which to listen to clicks
 * @param callback Function to trigger when clicked outside
 * @returns void
 */
export const addClickOutsideListener = (
  element: HTMLElement,
  callback: (event?: Event) => void,
): void => {
  document.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;

    if (!!target && !element.contains(target)) {
      callback.call(this, event);
    }
  });
};
