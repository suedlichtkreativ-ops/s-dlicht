/**
 * Bildformate für <Picture>. Für die schlanke Vorschau-Version (SITE_PREVIEW=1)
 * nur WebP in zwei Größen, damit die Dateianzahl klein bleibt. Live: AVIF + WebP.
 */
export const isPreview = process.env.SITE_PREVIEW === '1';

export const pic = isPreview
  ? ({ formats: ['webp'], fallbackFormat: 'webp' } as const)
  : ({ formats: ['avif', 'webp'] } as const);

export const pickWidths = (widths: number[]) => (isPreview ? widths.filter((w, i) => i === widths.length - 1 || w === 800) : widths);
