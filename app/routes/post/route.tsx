import { useEffect } from 'react';
import { Outlet, useRouteError } from '@remix-run/react';
import { MDXProvider } from '@mdx-js/react';
import { Layout } from '~/components/Layout';
import { components } from '~/components/post-preset';
import codeTheme from '~/styles/code-theme.css?url';
import type { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => [
  {
    href: codeTheme,
    rel: 'stylesheet',
  },
];

export default function PostPage() {
  return (
    <Layout>
      <article className="full-bleed-wrapper">
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
