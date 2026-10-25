const IP_PATTERN = /^[0-9a-fA-F:.]{2,45}$/;

export function clientIp(headers: Headers) {
  const candidates = [
    headers.get('cf-connecting-ip'),
    headers.get('x-real-ip'),
    headers.get('x-forwarded-for')?.split(',')[0],
  ];
  return (
    candidates.map((value) => value?.trim()).find((value) => value && IP_PATTERN.test(value)) ??
    null
  );
}
