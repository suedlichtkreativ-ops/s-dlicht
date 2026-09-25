// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://suedlicht-studio.de',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  image: { layout: 'constrained' },
  compressHTML: true,
});
