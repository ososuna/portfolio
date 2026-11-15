import type { IconName } from '@icons/names';
import ArcosIcon from '@icons/ArcosIcon.astro';
import AstroIcon from '@icons/AstroIcon.astro';
import AwsIcon from '@icons/AwsIcon.astro';
import BootstrapIcon from '@icons/BootstrapIcon.astro';
import DockerIcon from '@icons/DockerIcon.astro';
import ExpressJsIcon from '@icons/ExpressJsIcon.astro';
import GEIcon from '@icons/GEIcon.astro';
import GitHubIcon from '@icons/GitHubIcon.astro';
import LangfuseIcon from '@icons/LangfuseIcon.astro';
import LinkedInIcon from '@icons/LinkedInIcon.astro';
import MongoDbIcon from '@icons/MongoDbIcon.astro';
import MySqlIcon from '@icons/MySqlIcon.astro';
import NextJSIcon from '@icons/NextJSIcon.astro';
import NodeJsIcon from '@icons/NodeJsIcon.astro';
import OpenAiIcon from '@icons/OpenAiIcon.astro';
import OpenTelemetryIcon from '@icons/OpenTelemetryIcon.astro';
import OracleIcon from '@icons/OracleIcon.astro';
import PostgreSqlIcon from '@icons/PostgreSqlIcon.astro';
import PythonIcon from '@icons/PythonIcon.astro';
import ReactIcon from '@icons/ReactIcon.astro';
import ShadcnUiIcon from '@icons/ShadcnUiIcon.astro';
import SpringIcon from '@icons/SpringIcon.astro';
import TailwindIcon from '@icons/TailwindIcon.astro';
import TypeScriptIcon from '@icons/TypeScriptIcon.astro';
import VercelIcon from '@icons/VercelIcon.astro';
import VitestIcon from '@icons/VitestIcon.astro';
import VueIcon from '@icons/VueIcon.astro';

export type IconComponent = typeof GitHubIcon;

export const icons: Record<IconName, IconComponent> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  arcos: ArcosIcon,
  oracle: OracleIcon,
  'ge-aerospace': GEIcon,
  astro: AstroIcon,
  aws: AwsIcon,
  bootstrap: BootstrapIcon,
  docker: DockerIcon,
  express: ExpressJsIcon,
  langfuse: LangfuseIcon,
  mongodb: MongoDbIcon,
  mysql: MySqlIcon,
  nextjs: NextJSIcon,
  nodejs: NodeJsIcon,
  openai: OpenAiIcon,
  opentelemetry: OpenTelemetryIcon,
  postgresql: PostgreSqlIcon,
  python: PythonIcon,
  react: ReactIcon,
  shadcn: ShadcnUiIcon,
  spring: SpringIcon,
  tailwind: TailwindIcon,
  typescript: TypeScriptIcon,
  vercel: VercelIcon,
  vitest: VitestIcon,
  vue: VueIcon,
};
