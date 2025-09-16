const ratioPattern = /^\s*(\d+)\s*:\s*(\d+)\s*$/;

export interface AspectRatioDimensions {
  width: number;
  height: number;
}

export function parseAspectRatio(value: string): AspectRatioDimensions {
  const match = ratioPattern.exec(value);
  if (!match) {
    throw new Error(`Invalid aspect ratio format: ${value}`);
  }
  const width = Number(match[1]);
  const height = Number(match[2]);
  if (width <= 0 || height <= 0) {
    throw new Error('Aspect ratio values must be positive.');
  }
  return { width, height };
}

export function aspectRatioToNumber(value: string): number {
  const { width, height } = parseAspectRatio(value);
  return width / height;
}

export function normalizeAspectRatio(value: string): string {
  const { width, height } = parseAspectRatio(value);
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}
