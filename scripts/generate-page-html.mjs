// ページ別 OGP 用の静的 HTML を生成する（npm run build の最後に実行）。
//
// このサイトは SPA で、SNS や LINE のクローラーは JS を実行せず index.html の <head> しか読まない。
// そのため src/data/pageMeta.json に定義したページについて、dist/index.html を元に
// <title> / description / OGP / canonical だけを差し替えた HTML を dist/pages/<key>.html へ書き出す。
// script / link（ハッシュ付き chunk）は index.html と同一なので、React アプリはそのまま起動する。
//
// 配信: deploy.ps1 が dist/pages/gachacho.html を S3 のキー `gachacho`（拡張子なし、text/html）へ置く。
// CloudFront は /gachacho をそのオブジェクトで直接返すため、SPA フォールバック（index.html）より先に読まれる。
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_ORIGIN = 'https://smartthanks.world';
const SITE_NAME = '株式会社SmartThanks';
const pageMeta = JSON.parse(readFileSync(resolve(root, 'src/data/pageMeta.json'), 'utf8'));
const indexHtml = readFileSync(resolve(root, 'dist/index.html'), 'utf8');

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const replaceOnce = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) throw new Error(`generate-page-html: ${label} が dist/index.html に見つかりません`);
  return html.replace(pattern, replacement);
};

mkdirSync(resolve(root, 'dist/pages'), { recursive: true });

for (const [key, meta] of Object.entries(pageMeta)) {
  if (key.startsWith('_')) continue;
  const url = `${SITE_ORIGIN}${meta.path}`;
  const image = `${SITE_ORIGIN}${meta.ogImage}`;
  const ogTitle = meta.ogTitle ?? meta.title;

  let html = indexHtml;
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${escapeAttr(meta.title)}</title>`, '<title>');
  html = replaceOnce(
    html,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    'meta description',
  );
  // 既存の OGP ブロック（og:title 〜 og:image）をページ用に置き換える
  html = replaceOnce(
    html,
    /<meta property="og:title"[\s\S]*?<meta property="og:image" content="[^"]*" \/>/,
    [
      `<meta property="og:title" content="${escapeAttr(ogTitle)}" />`,
      `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:site_name" content="${SITE_NAME}" />`,
      `<meta property="og:locale" content="ja_JP" />`,
      `<meta property="og:image" content="${image}" />`,
      `<meta property="og:image:width" content="${meta.ogImageWidth}" />`,
      `<meta property="og:image:height" content="${meta.ogImageHeight}" />`,
      `<meta property="og:image:type" content="${meta.ogImageType}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escapeAttr(ogTitle)}" />`,
      `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
      `<meta name="twitter:image" content="${image}" />`,
      `<link rel="canonical" href="${url}" />`,
    ].join('\n    '),
    'OGP block',
  );

  const out = resolve(root, `dist/pages/${key}.html`);
  writeFileSync(out, html);
  console.log(`generate-page-html: ${meta.path} -> dist/pages/${key}.html`);
}
