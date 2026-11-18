// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://example.com', // TODO: real domain
  redirects: { '/home-2': '/',
    '/services/kyphoplasty': '/services/vertebral-augmentation',
    '/services/mild-procedure': '/services/percutaneous-interlaminar-decompression',
    '/services/intracept-procedure': '/services/basivertebral-nerve-ablation' },
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
