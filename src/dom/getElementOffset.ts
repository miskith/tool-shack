/**
 * Get element's offset relative to the whole page
 *
 * @param element HTMLElement for which should be calculated offset
 * @returns Object with top and left offset value
 */
export const getOffset = (element: HTMLElement): { top: number; left: number } => {
	const box: DOMRect = element.getBoundingClientRect();

	return { top: box.top + window.pageYOffset, left: box.left + window.pageXOffset };
};
