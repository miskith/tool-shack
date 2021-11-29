export const appendBefore = (newNode: HTMLElement, referenceNode: HTMLElement): boolean =>
  !!referenceNode.parentElement?.insertBefore(newNode, referenceNode);
