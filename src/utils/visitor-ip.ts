import { useEffect, useState } from 'react';

const TIMEOUT = 800;

let request: Promise<string | null> | undefined;

async function fetchIp() {
  try {
    const response = await fetch('/api/ip', { signal: AbortSignal.timeout(TIMEOUT) });
    const { ip } = (await response.json()) as { ip: string | null };
    return ip;
  } catch {
    return null;
  }
}

export function loadVisitorIp() {
  request ??= fetchIp();
  return request;
}

export function useVisitorIp() {
  const [ip, setIp] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    loadVisitorIp().then((value) => {
      if (active) setIp(value);
    });
    return () => {
      active = false;
    };
  }, []);

  return ip;
}
