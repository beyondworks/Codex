import { describe, expect, it } from 'vitest';
import { aspectRatioToNumber, normalizeAspectRatio, parseAspectRatio } from '../src/utils/aspectRatio';

describe('aspect ratio helpers', () => {
  it('parses valid ratios', () => {
    expect(parseAspectRatio('16:9')).toEqual({ width: 16, height: 9 });
  });

  it('normalizes ratios with whitespace', () => {
    expect(normalizeAspectRatio(' 4 :  3 ')).toBe('4:3');
  });

  it('computes numeric ratio', () => {
    expect(aspectRatioToNumber('3:2')).toBeCloseTo(1.5);
  });

  it('throws on invalid ratio', () => {
    expect(() => parseAspectRatio('invalid')).toThrowError();
  });
});
