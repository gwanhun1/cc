export function formatYearMonth(dateStr: Date): string {
  const dateObj = new Date(dateStr);

  const year: number = dateObj.getFullYear();
  let month: number = dateObj.getMonth() + 1;

  const monthStr: string = month < 10 ? `0${month}` : month.toString();

  return `${year}-${monthStr}`;
}
