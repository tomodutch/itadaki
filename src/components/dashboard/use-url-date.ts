'use client';

import { useParams, useRouter } from 'next/navigation';
import { parseISO, isValid, startOfDay, format } from 'date-fns';
import { useMemo, useCallback } from 'react';

export function useUrlDate(): [Date, (newDate: Date) => void] {
  const params = useParams();
  const router = useRouter();

  const dateParam = typeof params.date === 'string' ? params.date : '';

  const date = useMemo(() => {
    const parsed = parseISO(dateParam);
    return isValid(parsed) ? startOfDay(parsed) : startOfDay(new Date());
  }, [dateParam]);

  const setDate = useCallback(
    (newDate: Date) => {
      const iso = format(newDate, 'yyyy-MM-dd');
      router.push(`/dashboard/${iso}`);
    },
    [router]
  );

  return [date, setDate];
}
