// Kept free of `astro:content` imports so `content.config.ts` can use it.
export const projectLinkKinds = ['live', 'source', 'ui-source', 'api-source'] as const;

export type ProjectLinkKind = (typeof projectLinkKinds)[number];
