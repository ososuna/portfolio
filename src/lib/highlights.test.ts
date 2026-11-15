import { describe, expect, it } from 'vitest';
import { parseHighlights } from '@lib/highlights';

describe('parseHighlights', () => {
  it('returns plain text as a single plain segment', () => {
    expect(parseHighlights('I build effective software.')).toEqual([
      { text: 'I build effective software.', highlighted: false },
    ]);
  });

  it('splits a single Highlight out of the surrounding text', () => {
    expect(parseHighlights('My name is **Oswaldo Osuna** and I am here.')).toEqual([
      { text: 'My name is ', highlighted: false },
      { text: 'Oswaldo Osuna', highlighted: true },
      { text: ' and I am here.', highlighted: false },
    ]);
  });

  it('handles a Highlight at the start', () => {
    expect(parseHighlights('**ARCOS LLC** is where I work.')).toEqual([
      { text: 'ARCOS LLC', highlighted: true },
      { text: ' is where I work.', highlighted: false },
    ]);
  });

  it('handles a Highlight at the end', () => {
    expect(parseHighlights('I am an **AI Engineer**')).toEqual([
      { text: 'I am an ', highlighted: false },
      { text: 'AI Engineer', highlighted: true },
    ]);
  });

  it('keeps adjacent Highlights apart', () => {
    expect(parseHighlights('**6 years****AI Engineer** and **one** **two**')).toEqual([
      { text: '6 years', highlighted: true },
      { text: 'AI Engineer', highlighted: true },
      { text: ' and ', highlighted: false },
      { text: 'one', highlighted: true },
      { text: ' ', highlighted: false },
      { text: 'two', highlighted: true },
    ]);
  });

  it('renders an unclosed mark as literal text', () => {
    expect(parseHighlights('I am **unclosed')).toEqual([
      { text: 'I am **unclosed', highlighted: false },
    ]);
    expect(parseHighlights('**closed** then **open')).toEqual([
      { text: 'closed', highlighted: true },
      { text: ' then **open', highlighted: false },
    ]);
  });

  it('keeps a lone asterisk as literal text', () => {
    expect(parseHighlights('5 * 3 = 15')).toEqual([{ text: '5 * 3 = 15', highlighted: false }]);
    expect(parseHighlights('a **b*c** d')).toEqual([
      { text: 'a ', highlighted: false },
      { text: 'b*c', highlighted: true },
      { text: ' d', highlighted: false },
    ]);
  });
});
