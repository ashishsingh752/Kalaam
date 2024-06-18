export function byteToMB(byte: number) {
  return byte / 1048576;
}

export function getRandomNumber(min: number, max: number): string{
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

