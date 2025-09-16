import { describe, expect, it } from 'vitest';
import { isSafeHttpUrl } from '../src/utils/urlSafety';

describe('isSafeHttpUrl', () => {
  it('accepts https urls', () => {
    expect(isSafeHttpUrl('https://example.com')).toBe(true);
  });

  it('rejects non-http protocols', () => {
    expect(isSafeHttpUrl('ftp://example.com')).toBe(false);
  });

  it('rejects localhost', () => {
    expect(isSafeHttpUrl('http://localhost:3000')).toBe(false);
  });

  it('rejects private ip addresses', () => {
    expect(isSafeHttpUrl('http://192.168.0.1')).toBe(false);
  });
});
