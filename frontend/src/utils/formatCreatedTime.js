export const formatcreatedTime = (
  createdTime,
  getDate = true,
  getTime = true
) => {
  const month = new Date(createdTime).toLocaleString("default", {
    month: "short",
  });
  const date = new Date(createdTime).getDate();
  const year = new Date(createdTime).getFullYear();
  const time = new Date(createdTime).toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const currentYear = new Date().getFullYear();
  let returnFormat = "";
  if (year < currentYear) {
    if (getDate) {
      returnFormat =
        month.toString() + " " + date.toString() + " on " + year.toString();
    } else {
      returnFormat = month.toString() + " " + " on " + year.toString();
    }
  } else {
    if (getTime) {
      returnFormat =
        month.toString() + " " + date.toString() + " at " + time.toString();
    } else {
      returnFormat = month.toString() + " " + date.toString();
    }
  }
  return returnFormat;
};
