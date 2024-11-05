import { format, formatDistanceToNow } from 'date-fns';
import { ErrorBoundary } from 'react-error-boundary';

type Props = { date: number };

export function DateFormat({ date }: Props) {
  return (
    <ErrorBoundary fallback={<span>{new Date(date).toDateString()}</span>}>
      <UnsafeDateFormat date={Number(date)} />
    </ErrorBoundary>
  );
}

function UnsafeDateFormat({ date }: { date: number }) {
  const absolute = format(date, 'dd MMM yyyy HH:mm');
  const relative = formatDistanceToNow(date, { addSuffix: true });
  return <span title={absolute}>{relative}</span>;
}
