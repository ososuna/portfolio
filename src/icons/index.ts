import type { IconName } from '@icons/names';
import ArcosIcon from '@icons/ArcosIcon.astro';
import GEIcon from '@icons/GEIcon.astro';
import GitHubIcon from '@icons/GitHubIcon.astro';
import LinkedInIcon from '@icons/LinkedInIcon.astro';
import OracleIcon from '@icons/OracleIcon.astro';

export const icons: Record<IconName, typeof GitHubIcon> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  arcos: ArcosIcon,
  oracle: OracleIcon,
  'ge-aerospace': GEIcon,
};
