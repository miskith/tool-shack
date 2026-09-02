/**
 * Wait for an element matching selector to appear in the DOM
 *
 * @param selector CSS selector of the target element
 * @param timeout Timeout in milliseconds (default 5000)
 * @param parent Root element to observe (default document)
 * @returns Promise resolving to the HTMLElement
 */
export const waitForElement = <T extends HTMLElement = HTMLElement>(
  selector: string,
  timeout = 5000,
  parent: HTMLElement | Document = document,
): Promise<T> =>
  new Promise((resolve, reject) => {
    const existing = parent.querySelector<T>(selector);
    if (existing) {
      return resolve(existing);
    }

    const observer = new MutationObserver(() => {
      const el = parent.querySelector<T>(selector);
      if (el) {
        observer.disconnect();
        clearTimeout(timer);
        resolve(el);
      }
    });

    const timer = setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Timeout waiting for element matching selector: "${selector}"`));
    }, timeout);

    observer.observe(parent instanceof Document ? parent.body || parent.documentElement : parent, {
      childList: true,
      subtree: true,
    });
  });
