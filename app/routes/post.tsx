import type { LinksFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { MDXProvider } from '@mdx-js/react';
import { ModeToggle } from '~/components/mode-toggle';
import { components } from '~/components/post-preset';
import syntaxHighlight from '~/styles/syntax/atom-one-dark.min.css?url';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: syntaxHighlight,
  },
];

export default function PostsPage() {
  return (
    <div>
      <header>
        Header
        <ModeToggle />
      </header>
      <article>
        <MDXProvider components={components}>
          <Outlet />
        </MDXProvider>
      </article>
      <footer>Footer</footer>
    </div>
  );
}
