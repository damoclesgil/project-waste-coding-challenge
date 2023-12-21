function isIsoDate(str) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str);
  return d instanceof Date && !isNaN(d.getTime()) && d.toISOString() === str; // valid date
}
export const formatDate = (value) => {
  if (isIsoDate(value)) {
    return new Date(value).toLocaleDateString("en-US", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "2-digit",
      minutes: "2-digit",
      day: "2-digit",
    });
  }
  return "Invalid Date";
};
export const formatTime = (value) => {
  if (isIsoDate(value)) {
    let getTime = new Date(value)
      .toLocaleTimeString("en-US", {
        timeZone: "America/Los_Angeles",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .slice(0, 8);
    return getTime;
  }
  return "Invalid Time";
};

export const formatDateAndTime = (date) => {
  if (isIsoDate(date)) {
    let formattedDate = `${formatDate(date)} ${formatTime(date)}`;
    return formattedDate;
  }
  return "Invalid Date";
};
