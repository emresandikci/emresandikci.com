import { describe, expect, it } from 'vitest';
import { clientIp } from './ip';

const headers = (entries: Record<string, string>) => new Headers(entries);

describe('clientIp', () => {
  it('prefers the Cloudflare header, then X-Real-IP, then the first X-Forwarded-For hop', () => {
    expect(clientIp(headers({ 'cf-connecting-ip': '85.105.1.2', 'x-real-ip': '10.0.0.1' }))).toBe(
      '85.105.1.2'
    );
    expect(clientIp(headers({ 'x-real-ip': '85.105.1.2' }))).toBe('85.105.1.2');
    expect(clientIp(headers({ 'x-forwarded-for': '2a02:ff0::1, 172.18.0.2' }))).toBe(
      '2a02:ff0::1'
    );
  });

  it('returns null when nothing usable is sent', () => {
    expect(clientIp(headers({}))).toBeNull();
    expect(clientIp(headers({ 'x-real-ip': '<script>alert(1)</script>' }))).toBeNull();
  });
});
