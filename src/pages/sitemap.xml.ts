import type { APIRoute } from 'astro';
import { projects, site } from '../data/work';

export const GET: APIRoute = () => {
  const paths = ['/', '/arbeiten/', '/leistungen/', '/ueber/', '/kontakt/', ...projects.map((p) => `/arbeiten/${p.slug}/`), '/impressum/', '/datenschutz/', '/ki-hinweis/'];
  const today = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths
    .map((p) => `<url><loc>${site.url}${p}</loc><lastmod>${today}</lastmod></url>`)
    .join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
