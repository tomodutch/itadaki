import { useParams } from 'next/navigation';
import { parseISO, isValid, startOfDay } from 'date-fns';
import { useMemo } from 'react';

export function useUrlDate(): Date {
    const params = useParams();
    const dateParam = typeof params.date === 'string' ? params.date : '';

    return useMemo(() => {
        const parsed = parseISO(dateParam);
        return isValid(parsed) ? startOfDay(parsed) : startOfDay(new Date());
    }, [dateParam]);
}
