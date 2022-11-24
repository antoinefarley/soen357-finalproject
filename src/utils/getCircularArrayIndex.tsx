export const getCircularArrayIndex = (n: number, i: number) =>
  ((i % n) + n) % n;
