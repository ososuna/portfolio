// Icon names a content collection can refer to. Kept apart from the registry in
// `index.ts` so `content.config.ts` validates names without importing components.
export const iconNames = [
  'github',
  'linkedin',
  'arcos',
  'oracle',
  'ge-aerospace',
  'astro',
  'aws',
  'bootstrap',
  'docker',
  'express',
  'langfuse',
  'mongodb',
  'mysql',
  'nextjs',
  'nodejs',
  'openai',
  'opentelemetry',
  'postgresql',
  'python',
  'react',
  'shadcn',
  'spring',
  'tailwind',
  'typescript',
  'vercel',
  'vitest',
  'vue',
] as const;

export type IconName = (typeof iconNames)[number];
