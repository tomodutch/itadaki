import { useParams } from 'next/navigation';
import { parseISO, isValid, startOfDay } from 'date-fns';

export function useUrlDate(): Date {
    const params = useParams();
    const dateParam = typeof params.date === 'string' ? params.date : '';
    const parsed = parseISO(dateParam);
    const date = isValid(parsed) ? startOfDay(parsed) : startOfDay(new Date());
    return date;
}