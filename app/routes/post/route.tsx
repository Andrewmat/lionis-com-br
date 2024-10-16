import { useEffect } from 'react';
import type { LinksFunction } from '@remix-run/node';
import { Outlet, useRouteError } from '@remix-run/react';
import { MDXProvider } from '@mdx-js/react';
import { Layout } from '~/components/Layout';
import { components } from '~/components/post-preset';
import syntaxHighlightDark from '~/styles/syntax/shades-of-purple.min.css?url';
import syntaxHighlightLight from '~/styles/syntax/intellij-light.min.css?url';

export const links: LinksFunction = () => [
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
      <article className="full-bleed-wrapper mx-5 lg:mx-0">
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
