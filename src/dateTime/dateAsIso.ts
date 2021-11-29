export const dateAsIso = (date: Date) => {
  const timezoneOffset = date.getTimezoneOffset();

  let isoFormat = '';
  isoFormat += `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
  isoFormat += `T${padNumber(date.getHours())}:${padNumber(date.getMinutes())}:${padNumber(date.getSeconds())}`;
  isoFormat += `${timezoneOffset <= 0 ? '+' : '-'}${padNumber(Math.floor(Math.abs(timezoneOffset) / 60))}:${padNumber(Math.abs(timezoneOffset) % 60)}`;

  return isoFormat;
};

const padNumber = (number: number): string => `${number}`.padStart(2, '0');
