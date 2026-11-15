import { useEffect, useState } from 'react';

/**
 * False on the server-rendered HTML and until the island hydrates. Controls disable themselves
 * until then so an early click is not silently lost.
 */
export const useHydrated = () => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
};
