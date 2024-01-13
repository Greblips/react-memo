export const formatTime = timeInSeconds => {
  const seconds = ("0" + String(timeInSeconds % 60)).slice(-2);
  const minutes = ("0" + String(Math.floor(timeInSeconds / 60))).slice(-2);

  return `${minutes}:${seconds}`;
};
