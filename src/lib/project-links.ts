// Kept free of `astro:content` imports so `content.config.ts` can use it.
export const projectLinkKinds = ['live', 'source'] as const;

export type ProjectLinkKind = (typeof projectLinkKinds)[number];
