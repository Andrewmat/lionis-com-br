import type { LoaderFunction } from '@remix-run/node';
import type { MetaDescriptor } from '@remix-run/react';
import { format, formatDistanceToNow } from 'date-fns';

export type FrontmatterMeta = {
  title: string;
  published: boolean;
  date: string;
  description?: string;
  summary?: string;
  tags?: string[];
};

/** transforms mdx frontmatter metadata to remix metadata */
export function getMeta(frontmatter: FrontmatterMeta): MetaDescriptor[] {
  return [
    { title: frontmatter.title },
    { description: frontmatter.description },
  ];
}

export function getLoader(frontmatter: FrontmatterMeta): LoaderFunction {
  if (import.meta.env.DEV) {
    return () => null;
  }
  if (frontmatter.published !== true) {
    return () => {
      throw new Response('Not Found', { status: 404 });
    };
  }
  return () => {
    return null;
  };
}

export function PostHeading(props: FrontmatterMeta) {
  return (
    <div className="mb-4">
      <h1 className="text-4xl mb-1">{props.title}</h1>
      <small title={format(props.date, 'dd MMM yyyy HH:mm')}>
        {formatDistanceToNow(props.date)}
      </small>
    </div>
  );
}
