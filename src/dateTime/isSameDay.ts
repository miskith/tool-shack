/**
 * Check if two dates fall on the same calendar day
 *
 * @param firstDate First Date object or timestamp
 * @param secondDate Second Date object or timestamp
 * @returns Boolean indicating if both dates have matching day, month, and year
 */
export const isSameDay = (
  firstDate: Date | number | string,
  secondDate: Date | number | string,
): boolean => {
  const dateA = firstDate instanceof Date ? firstDate : new Date(firstDate);
  const dateB = secondDate instanceof Date ? secondDate : new Date(secondDate);

  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
};
