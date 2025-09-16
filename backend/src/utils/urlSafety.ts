import { isIP } from 'net';

const privateIpv4Ranges: Array<[number, number]> = [
  [ipToInt('10.0.0.0'), ipToInt('10.255.255.255')],
  [ipToInt('172.16.0.0'), ipToInt('172.31.255.255')],
  [ipToInt('192.168.0.0'), ipToInt('192.168.255.255')],
  [ipToInt('127.0.0.0'), ipToInt('127.255.255.255')],
  [ipToInt('169.254.0.0'), ipToInt('169.254.255.255')],
];

export function isSafeHttpUrl(candidate: string): boolean {
  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    return false;
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    return false;
  }

  const hostname = url.hostname.toLowerCase();
  if (hostname === 'localhost' || hostname.endsWith('.local')) {
    return false;
  }

  const ipType = isIP(hostname);
  if (ipType === 4) {
    const asInt = ipToInt(hostname);
    if (privateIpv4Ranges.some(([start, end]) => asInt >= start && asInt <= end)) {
      return false;
    }
  }

  if (ipType === 6) {
    if (hostname === '::1' || hostname.startsWith('fd') || hostname.startsWith('fe80')) {
      return false;
    }
  }

  return true;
}

function ipToInt(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + Number(octet), 0);
}
