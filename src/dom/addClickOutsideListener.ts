/**
 * Add event listener to listen to clicks outside of given element
 *
 * @param element Node element outside which to listen to clicks
 * @param callback Function to trigger when clicked outside
 * @returns Cleanup function to remove the listener
 */
export const addClickOutsideListener = (
  element: HTMLElement,
  callback: (event?: Event) => void,
): (() => void) => {
  const handleClick = (event: Event): void => {
    const target = event.target as HTMLElement;

    if (!!target && !element.contains(target)) {
      callback(event);
    }
  };

  document.addEventListener('click', handleClick);

  return () => {
    document.removeEventListener('click', handleClick);
  };
};
