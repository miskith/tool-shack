/**
 * Convert a date into human-readable relative time string (e.g. "5 minutes ago", "in 2 days")
 *
 * @param date Target Date, timestamp number, or date string
 * @param locale Optional BCP 47 locale tag (defaults to 'en')
 * @returns Human-readable relative time string
 */
export const timeAgo = (date: Date | number | string, locale = 'en'): string => {
  const targetDate = date instanceof Date ? date : new Date(date);
  const diffInSeconds = Math.round((targetDate.getTime() - Date.now()) / 1000);
  const absDiff = Math.abs(diffInSeconds);

  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (absDiff < 60) {
    return formatter.format(diffInSeconds, 'second');
  }

  const diffInMinutes = Math.round(diffInSeconds / 60);
  if (Math.abs(diffInMinutes) < 60) {
    return formatter.format(diffInMinutes, 'minute');
  }

  const diffInHours = Math.round(diffInMinutes / 60);
  if (Math.abs(diffInHours) < 24) {
    return formatter.format(diffInHours, 'hour');
  }

  const diffInDays = Math.round(diffInHours / 24);
  if (Math.abs(diffInDays) < 30) {
    return formatter.format(diffInDays, 'day');
  }

  const diffInMonths = Math.round(diffInDays / 30);
  if (Math.abs(diffInMonths) < 12) {
    return formatter.format(diffInMonths, 'month');
  }

  const diffInYears = Math.round(diffInDays / 365);
  return formatter.format(diffInYears, 'year');
};
