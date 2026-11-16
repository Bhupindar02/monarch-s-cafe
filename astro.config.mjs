import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://themonarchsmug.pages.dev',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  image: {
    domains: ['ik.imagekit.io'],
    remotePatterns: [{ protocol: 'https', hostname: 'ik.imagekit.io' }],
  },
});
