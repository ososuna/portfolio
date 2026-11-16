/**
 * The widths to offer in a `srcset`, none wider than the source. Astro upscales an image asked
 * for at more than its own width, which adds bytes without adding detail.
 */
export const srcsetWidths = ({
  sourceWidth,
  widths,
}: {
  sourceWidth: number;
  widths: number[];
}): number[] => [...new Set(widths.map((width) => Math.min(width, sourceWidth)))];
