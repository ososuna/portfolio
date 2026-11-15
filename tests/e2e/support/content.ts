import type { Page } from '@playwright/test';

/**
 * What the content baseline records for one page: per Section, in page order, the visible
 * text, link URLs and image alt text. Anything outside the Sections (the navigation bar) is
 * recorded under its own heading. Only rendered output is read, never classes or component
 * structure, so internals can be rewritten freely while the published content stays put.
 */
interface ContentGroup {
  name: string;
  text: string[];
  links: string[];
  imageAlts: string[];
}

interface PageContent {
  title: string;
  groups: ContentGroup[];
}

const readPageContent = (page: Page): Promise<PageContent> =>
  page.evaluate(() => {
    // Icons are skipped: their SVG titles and styles are artwork, not published copy.
    const skipped = new Set(['script', 'style', 'noscript', 'template', 'svg']);
    // Inline elements continue the line of text they sit in; any other element starts a new
    // line. Links and buttons always get their own line, so adjacent controls never merge.
    const inline = new Set([
      'ABBR', 'B', 'BDI', 'BDO', 'CITE', 'CODE', 'DATA', 'DFN', 'EM', 'I', 'KBD', 'MARK', 'Q',
      'S', 'SAMP', 'SMALL', 'SPAN', 'STRONG', 'SUB', 'SUP', 'TIME', 'U', 'VAR',
    ]);
    const collapse = (value: string) => value.replace(/\s+/g, ' ').trim();

    const sections = [...document.querySelectorAll('main section')].filter(
      (section) => !section.parentElement?.closest('main section'),
    );
    const emptyGroup = (name: string): ContentGroup => ({ name, text: [], links: [], imageAlts: [] });
    const groups = [
      emptyGroup('Outside Sections'),
      ...sections.map((section, index) => {
        const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
        return emptyGroup(`Section ${index + 1}: ${heading ? collapse(heading.textContent ?? '') : '(no heading)'}`);
      }),
    ];
    const groupOf = (node: Node) => {
      const index = sections.findIndex((section) => section.contains(node));
      return groups[index + 1];
    };

    let lineOwner: Element | null = null;
    let line = '';
    let lineGroup = groups[0];
    const flush = () => {
      const text = collapse(line);
      if (text) lineGroup.text.push(text);
      line = '';
    };

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: (node) =>
        node instanceof Element && skipped.has(node.localName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
    });
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (node instanceof Element) {
        const href = node.tagName === 'A' ? node.getAttribute('href') : null;
        if (href !== null) groupOf(node).links.push(href);
        if (node.tagName === 'IMG') groupOf(node).imageAlts.push(node.getAttribute('alt') ?? '(no alt attribute)');
        continue;
      }
      let owner = node.parentElement!;
      while (inline.has(owner.tagName) && owner.parentElement) owner = owner.parentElement;
      if (owner !== lineOwner) {
        flush();
        lineOwner = owner;
        lineGroup = groupOf(node);
      }
      line += node.textContent ?? '';
    }
    flush();

    return { title: collapse(document.title), groups };
  });

// Built asset file names carry a content hash (`/_astro/name.Ab12Cd34.ext`) that changes
// between builds without any change to the content.
const normaliseUrl = (url: string) => url.replace(/(\/_astro\/[^/?#]+?)\.[\w-]{8,}(\.\w+)/g, '$1.[hash]$2');

const list = (items: string[]) => (items.length ? items.map((item) => `- ${item}`).join('\n') : '(none)');

/** Renders the content of the page as stable, diff-friendly text. */
export const renderContentBaseline = async (page: Page): Promise<string> => {
  const { title, groups } = await readPageContent(page);
  const lines = [`Title: ${title}`, '', '# Section order', ...groups.slice(1).map((group) => `- ${group.name}`)];
  for (const group of groups) {
    lines.push(
      '',
      `# ${group.name}`,
      '',
      '## Text',
      list(group.text),
      '',
      '## Links',
      list(group.links.map(normaliseUrl)),
      '',
      '## Image alt text',
      list(group.imageAlts),
    );
  }
  return `${lines.join('\n')}\n`;
};
