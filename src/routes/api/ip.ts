import { createFileRoute } from '@tanstack/react-router';
import { clientIp } from '~/utils/ip';

export const Route = createFileRoute('/api/ip')({
  server: {
    handlers: {
      GET: ({ request }) =>
        Response.json(
          { ip: clientIp(request.headers) },
          { headers: { 'Cache-Control': 'no-store, private' } }
        ),
    },
  },
});
