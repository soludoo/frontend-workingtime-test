export const formatDuration = (ms: number) => {
  const totalMinutes = Math.floor(ms / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

export const getTodayDate = () => {
  const today = new Date();

  return today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export function capitalizeFirstLetter(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const formatLeaveDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  const sameMonth = start.getUTCMonth() === end.getUTCMonth();
  const sameDay = start.getUTCDate() === end.getUTCDate();

  const monthFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
  });

  const startMonth = monthFormatter.format(start);
  const endMonth = monthFormatter.format(end);

  const startDay = start.getUTCDate();
  const endDay = end.getUTCDate();

  const startYear = start.getUTCFullYear();
  const endYear = end.getUTCFullYear();
  if (sameDay && sameMonth && sameYear) {
    return `${startDay} ${startMonth} ${startYear}`;
  }
  if (sameMonth && sameYear) {
    return `${startDay} - ${endDay} ${startMonth} ${startYear}`;
  }
  if (sameYear) {
    return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${startYear}`;
  }
  return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
};
