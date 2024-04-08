export const convertTime = (minutesBigInt) => {
  const minutes = Number(minutesBigInt);
  const hours = Math.floor(minutes / 100);
  const mins = minutes % 100;
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
};
