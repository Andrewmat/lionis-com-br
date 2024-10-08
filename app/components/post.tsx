import type { MDXComponents } from 'node_modules/@mdx-js/react/lib';
import { cn } from '~/lib/utils';

export const components: MDXComponents = {
  // eslint-disable-next-line jsx-a11y/heading-has-content
  h1: (p) => <h1 {...p} className={cn('text-xl', p.className)} />,
  a: (p) => (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a {...p} className={cn('underline', p.className)} />
  ),
  ul: (p) => <ul {...p} className={cn('list-disc list-inside', p.className)} />,
  ol: (p) => (
    <ol {...p} className={cn('list-decimal list-inside', p.className)} />
  ),
  code: (p) => (
    <code
      {...p}
      className={cn(
        'inline-block px-0.5 py-0 rounded-sm text-secondary-foreground bg-secondary',
        p.className
      )}
    />
  ),
};
