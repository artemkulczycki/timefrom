export const getEnding = (number, endings) => {
  const remainder = Math.abs(number) % 100;
  if (remainder >= 11 && remainder <= 19) {
    return endings[0];
  }
  const lastDigit = remainder % 10;
  if (lastDigit === 1) {
    return endings[1];
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return endings[2];
  }
  return endings[0];
};
