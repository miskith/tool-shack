/**
 * Append given node after reference node in the DOM
 *
 * @param newNode New node element to be appended
 * @param referenceNode Reference node element
 * @returns Result of the action
 */
export const appendAfter = (newNode: HTMLElement, referenceNode: HTMLElement): boolean =>
  !!referenceNode.parentElement?.insertBefore(newNode, referenceNode.nextSibling);
