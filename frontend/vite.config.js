import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { SITE_URL, seoPages } from './src/data/seoData.js';

const distDirectory = fileURLToPath(new URL('./dist/', import.meta.url));

function seoAssetsPlugin() {
  return {
    name: 'acecore-seo-assets',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', SITE_URL);
    },
    closeBundle() {
      const publicUrls = Object.values(seoPages)
        .filter((page) => page.canonical && !page.noindex)
        .map((page) => new URL(page.canonical, `${SITE_URL}/`).href);
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...publicUrls.map((url) => `  <url><loc>${url}</loc></url>`),
        '</urlset>',
        '',
      ].join('\n');

      writeFileSync(`${distDirectory}sitemap.xml`, sitemap);
      writeFileSync(
        `${distDirectory}robots.txt`,
        `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), seoAssetsPlugin()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
});
