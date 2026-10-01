import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const root = path.resolve('out');
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.txt': 'text/plain' };
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (basePath && pathname !== basePath && !pathname.startsWith(basePath + '/')) { res.writeHead(404); return res.end('Not found'); }
    const filePath = basePath ? pathname.slice(basePath.length) || '/' : pathname;
    let target = path.resolve(root, '.' + filePath);
    if (target !== root && !target.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
    if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
    const body = await readFile(target);
    const gzip = /gzip/.test(req.headers['accept-encoding'] || '') && /\.(html|css|js|json|svg|txt)$/.test(target);
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': pathname.includes('/_next/static/') ? 'public, max-age=31536000, immutable' : 'no-cache', ...(gzip ? { 'Content-Encoding': 'gzip', 'Vary': 'Accept-Encoding' } : {}) });
    res.end(gzip ? gzipSync(body) : body);
  } catch { res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(await readFile(path.join(root, '404.html')).catch(() => 'Not found')); }
});
server.listen(4173, '127.0.0.1', () => console.log('Production preview: http://127.0.0.1:4173'));
