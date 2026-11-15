import type { GetImageResult } from 'astro';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Achievement as AchievementData } from '@lib/content';

interface Props {
  achievement: AchievementData;
  /** The optimized `achievement.image`, from `getImage`. */
  image: GetImageResult;
  learnMoreLabel: string;
}

export default function Achievement({ achievement, image, learnMoreLabel }: Props) {
  const { title, description, link } = achievement;
  return (
    <Card className="mb-6 max-w-sm md:w-1/2">
      <img src={image.src} {...image.attributes} alt={title} />
      <CardHeader>
        <CardTitle role="heading" aria-level={3} className="text-xl font-semibold">
          {title}
        </CardTitle>
        <CardDescription className="xss:text-base">{description}</CardDescription>
      </CardHeader>
      {link && (
        <CardContent>
          <a
            href={link}
            target="_blank"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            {learnMoreLabel}
            <ArrowRight aria-hidden="true" />
          </a>
        </CardContent>
      )}
    </Card>
  );
}
