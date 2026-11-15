import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHydrated } from '@/hooks/use-hydrated';
import type { Locale } from '@data/i18n/locales';

interface Props {
  locale: Locale;
  label: string;
}

const switchLocale = (nextLocale: Locale) => {
  const { pathname, search, hash } = window.location;
  const nextPath = nextLocale === 'en' ? pathname.replace(/^\/es/, '') || '/' : `/es${pathname}`;

  // The 'lang' key is returning visitors' stored choice: renaming it would reset it.
  localStorage.setItem('lang', nextLocale);
  window.location.assign(`${nextPath}${search}${hash}`);
};

export default function LocaleToggle({ locale, label }: Props) {
  const hydrated = useHydrated();
  const nextLocale: Locale = locale === 'es' ? 'en' : 'es';

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={label}
      disabled={!hydrated}
      onClick={() => switchLocale(nextLocale)}
    >
      <Languages aria-hidden="true" />
      <span>{locale.toUpperCase()}</span>
    </Button>
  );
}
