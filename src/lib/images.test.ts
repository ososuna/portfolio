import { describe, expect, it } from 'vitest';
import { srcsetWidths } from '@lib/images';

describe('srcsetWidths', () => {
  it('keeps every width the source can fill', () => {
    expect(srcsetWidths({ sourceWidth: 1920, widths: [384, 768] })).toEqual([384, 768]);
  });

  it('stops at the width of a smaller source', () => {
    expect(srcsetWidths({ sourceWidth: 627, widths: [384, 768] })).toEqual([384, 627]);
  });

  it('offers a source smaller than every width once', () => {
    expect(srcsetWidths({ sourceWidth: 300, widths: [384, 768] })).toEqual([300]);
  });
});
