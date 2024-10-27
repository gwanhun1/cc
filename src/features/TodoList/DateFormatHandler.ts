export const DateFormatHandler = (date: Date | string): string => {
  const dateObj = date instanceof Date ? date : new Date(date);

  const localDate = new Date(
    dateObj.getUTCFullYear(),
    dateObj.getUTCMonth(),
    dateObj.getUTCDate(),
  );

  const today = new Date();
  const tomorrow = new Date();
  today.setHours(0, 0, 0, 0);
  tomorrow.setDate(today.getDate() + 1);

  if (localDate.toDateString() === today.toDateString()) {
    return "Today";
  } else if (localDate.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else {
    return localDate
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, "/")
      .replace(".", "");
  }
};
