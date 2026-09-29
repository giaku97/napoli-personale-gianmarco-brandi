import lighthouse from 'lighthouse';
import { chromium } from '@playwright/test';
import net from 'node:net';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const output = fileURLToPath(new URL('../../qa/', import.meta.url));
await mkdir(output, { recursive: true });
const probe=net.createServer();await new Promise(resolve=>probe.listen(0,'127.0.0.1',resolve));const port=probe.address().port;await new Promise(resolve=>probe.close(resolve));
const chrome = await chromium.launch({channel:'chrome',headless:true,args:['--remote-debugging-port='+port]});
try {
  const result = await lighthouse('http://127.0.0.1:4173', { port, output: ['html', 'json'], logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] });
  await writeFile(path.join(output, 'lighthouse.html'), result.report[0]);
  await writeFile(path.join(output, 'lighthouse.json'), result.report[1]);
  console.log(JSON.stringify({ categories: Object.fromEntries(Object.entries(result.lhr.categories).map(([k, v]) => [k, v.score])), metrics: Object.fromEntries(['first-contentful-paint','largest-contentful-paint','speed-index','total-blocking-time','cumulative-layout-shift','interactive'].map(k => [k, result.lhr.audits[k]?.displayValue])), diagnostics: Object.entries(result.lhr.audits).filter(([,v]) => v.score !== null && v.score < 1 && v.details?.type === 'opportunity').map(([k,v]) => ({ id:k,title:v.title,display:v.displayValue })) }, null, 2));
} finally { try { await chrome.close(); } catch (error) { console.log(`Browser cleanup: ${error.code}; report already saved.`); } }

