import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  title: string;
  description: string;
  image: { src: string; width: number; height: number };
  link?: string;
  learnMoreLabel: string;
}

export default function Achievement({ title, description, image, link, learnMoreLabel }: Props) {
  return (
    <Card className="mb-6 max-w-sm md:w-1/2">
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={title}
        loading="lazy"
        decoding="async"
      />
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
