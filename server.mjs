import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { Readable, pipeline } from 'node:stream';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const CLIENT_DIR = join(__dirname, 'dist', 'client');

const { default: app } = await import('./dist/server/server.js');

const MIME = {
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.gif': 'image/gif',
  '.pdf': 'application/pdf',
};

const SSR_FALLBACK_EXT = new Set(['.txt', '.xml', '.json']);

const COMPRESSIBLE =
  /^(?:text\/|application\/(?:javascript|json|xml|manifest\+json)|image\/svg\+xml)/;
const COMPRESS_MIN_BYTES = 1024;

const BROTLI_PARAMS = {
  [zlib.constants.BROTLI_PARAM_QUALITY]: 5,
  [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
};

const PORT = process.env.PORT ?? 3000;
const HOST = '0.0.0.0';

function toHeaders(nodeHeaders) {
  const h = new Headers();
  for (const [key, value] of Object.entries(nodeHeaders)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) h.append(key, v);
    } else {
      h.set(key, value);
    }
  }
  return h;
}

function negotiateEncoding(req, contentType) {
  if (!contentType || !COMPRESSIBLE.test(contentType)) return null;
  const accepted = String(req.headers['accept-encoding'] ?? '');
  if (/\bbr\b/.test(accepted)) return 'br';
  if (/\bgzip\b/.test(accepted)) return 'gzip';
  return null;
}

function createCompressor(encoding) {
  return encoding === 'br'
    ? zlib.createBrotliCompress({
        flush: zlib.constants.BROTLI_OPERATION_FLUSH,
        params: BROTLI_PARAMS,
      })
    : zlib.createGzip({ flush: zlib.constants.Z_SYNC_FLUSH });
}

function compressBuffer(buf, encoding) {
  return new Promise((resolve, reject) => {
    const done = (err, out) => (err ? reject(err) : resolve(out));
    if (encoding === 'br') {
      zlib.brotliCompress(buf, { params: BROTLI_PARAMS }, done);
    } else {
      zlib.gzip(buf, done);
    }
  });
}

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');

  const ext = extname(url.pathname).toLowerCase();
  if (ext && MIME[ext]) {
    const hashed = url.pathname.startsWith('/assets/');
    const filePath = join(CLIENT_DIR, normalize(url.pathname));
    if (!filePath.startsWith(CLIENT_DIR)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
    try {
      const buf = await readFile(filePath);
      const contentType = MIME[ext];
      const headers = {
        'Content-Type': contentType,
        'Cache-Control': hashed
          ? 'public, max-age=31536000, immutable'
          : 'public, max-age=0, must-revalidate',
      };

      const encoding =
        buf.byteLength >= COMPRESS_MIN_BYTES ? negotiateEncoding(req, contentType) : null;

      if (encoding) {
        const compressed = await compressBuffer(buf, encoding);
        res.writeHead(200, {
          ...headers,
          'Content-Encoding': encoding,
          'Content-Length': compressed.byteLength,
          Vary: 'Accept-Encoding',
        });
        res.end(compressed);
        return;
      }

      res.writeHead(200, { ...headers, 'Content-Length': buf.byteLength });
      res.end(buf);
      return;
    } catch {
      if (!SSR_FALLBACK_EXT.has(ext)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
    }
  }

  const proto = req.headers['x-forwarded-proto'] ?? 'http';
  const host = req.headers.host ?? `localhost:${PORT}`;
  const fullUrl = new URL(req.url, `${proto}://${host}`);

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = chunks.length > 0 ? Buffer.concat(chunks) : null;
  const hasBody = body !== null && req.method !== 'GET' && req.method !== 'HEAD';

  const request = new Request(fullUrl, {
    method: req.method,
    headers: toHeaders(req.headers),
    ...(hasBody ? { body, duplex: 'half' } : {}),
  });

  let response;
  try {
    response = await app.fetch(request);
  } catch (err) {
    console.error('[ssr]', err);
    res.writeHead(500);
    res.end('Internal Server Error');
    return;
  }

  const responseHeaders = {};
  response.headers.forEach((v, k) => {
    responseHeaders[k] = v;
  });

  const encoding = responseHeaders['content-encoding']
    ? null
    : negotiateEncoding(req, responseHeaders['content-type']);

  if (!response.body) {
    res.writeHead(response.status, responseHeaders);
    res.end();
    return;
  }

  if (!encoding) {
    res.writeHead(response.status, responseHeaders);
    Readable.fromWeb(response.body).pipe(res);
    return;
  }

  delete responseHeaders['content-length'];
  res.writeHead(response.status, {
    ...responseHeaders,
    'content-encoding': encoding,
    vary: responseHeaders.vary ? `${responseHeaders.vary}, Accept-Encoding` : 'Accept-Encoding',
  });

  pipeline(Readable.fromWeb(response.body), createCompressor(encoding), res, (err) => {
    if (err) console.error('[ssr:compress]', err);
  });
}).listen(PORT, HOST, () => {
  console.log(`[web] listening on http://${HOST}:${PORT}`);
});
