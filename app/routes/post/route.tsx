import { useEffect } from 'react';
import type { LinksFunction } from '@remix-run/node';
import { Outlet, useRouteError } from '@remix-run/react';
import { MDXProvider } from '@mdx-js/react';
import { Layout } from '~/components/Layout';
import { components } from '~/components/post-preset';
import syntaxHighlightDark from '~/styles/syntax/atom-one-dark.min.css?url';
import syntaxHighlightLight from '~/styles/syntax/atom-one-light.min.css?url';
import styles from './styles.css?url';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles,
  },
  // TODO how to dynamically load CSS
  // for now it is glitchy
  {
    rel: 'stylesheet',
    href: syntaxHighlightDark,
    media: '(prefers-color-scheme: dark)',
  },
  {
    rel: 'stylesheet',
    href: syntaxHighlightLight,
    media: '(prefers-color-scheme: light)',
  },
];

export default function PostPage() {
  return (
    <Layout>
      <article className="post-wrapper">
        <MDXProvider components={components}>
          <Outlet />
        </MDXProvider>
      </article>
    </Layout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <div>Deu erro</div>;
}
