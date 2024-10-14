import type { LoaderFunction } from '@remix-run/node';

/** transforms mdx frontmatter metadata to remix metadata */
export function getMeta(frontmatter: any) {
  return [
    { title: frontmatter.title },
    { description: frontmatter.description },
  ];
}

export function getLoader(frontmatter: any): LoaderFunction {
  if (frontmatter.published !== true) {
    return () => {
      console.log('not published');
      return new Response('Not Found', { status: 404 });
    };
  }
  return () => {
    console.log('published');
    return null;
  };
}
