// Icon names a content collection can refer to. Kept apart from the registry in
// `index.ts` so `content.config.ts` validates names without importing components.
export const iconNames = ['github', 'linkedin', 'arcos', 'oracle', 'ge-aerospace'] as const;

export type IconName = (typeof iconNames)[number];
