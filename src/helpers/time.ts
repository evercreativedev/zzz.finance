export function getTimeRemaining(endtime: Date) {
  const total = endtime.getTime() - new Date().getTime();
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const seconds = Math.floor((total / 1000) % 60);
  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}
