import { format, formatDistanceToNow } from 'date-fns';

type ChirpFrontmatter = {
  title: string;
  publishDate: number;
};

export function ChirpFooter(props: ChirpFrontmatter) {
  return (
    <div className="mt-4">
      <h1 className="inline italic">&quot;{props.title}&quot;</h1>{' '}
      <small title={format(props.publishDate, 'dd MMM yyyy HH:mm')}>
        {formatDistanceToNow(props.publishDate, { addSuffix: true })}
      </small>
    </div>
  );
}
