/** One run of a Bio Paragraph: either plain text or a Highlight. */
export interface Segment {
  text: string;
  highlighted: boolean;
}

// A Highlight is the shortest non-empty run between a `**` and the next `**`.
const highlight = /\*\*(.+?)\*\*/g;

/**
 * Splits a Bio Paragraph written with `**...**` marks into ordered plain and highlighted
 * Segments, without the marks.
 */
export const parseHighlights = (text: string): Segment[] => {
  const segments: Segment[] = [];
  let plainStart = 0;
  for (const match of text.matchAll(highlight)) {
    if (match.index > plainStart)
      segments.push({ text: text.slice(plainStart, match.index), highlighted: false });
    segments.push({ text: match[1], highlighted: true });
    plainStart = match.index + match[0].length;
  }
  if (plainStart < text.length) segments.push({ text: text.slice(plainStart), highlighted: false });
  return segments;
};
