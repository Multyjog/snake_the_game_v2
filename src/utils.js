export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
export function isEqualCoords(a, b) {
  if ((a[0] === b[0]) & (a[1] === b[1])) return true;
  return false;
}
