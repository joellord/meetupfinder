function formattedDate(timestamp) {
  if (!timestamp) return "";
  let date = new Date(timestamp);
  let breakDown = date.toString().split(" ");

  return breakDown[1] + " " + breakDown[2] + " " + breakDown[3];
}

export {
  formattedDate
}