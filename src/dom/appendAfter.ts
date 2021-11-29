export const appendAfter = (newNode: HTMLElement, referenceNode: HTMLElement): boolean =>
  !!referenceNode.parentElement?.insertBefore(newNode, referenceNode.nextSibling);
