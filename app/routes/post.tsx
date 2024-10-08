import type { LinksFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { MDXProvider } from '@mdx-js/react';
import syntaxHighlight from '~/both.css?url';
import { cn } from '~/lib/utils';
import Post from './post.hello-world.mdx';
import { ModeToggle } from '~/components/mode-toggle';
import { components } from '~/components/post';

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
      <article className="[&>*]:my-4">
        <MDXProvider components={components}>
          <Outlet />
        </MDXProvider>
      </article>
      <footer>Footer</footer>
    </div>
  );
}
