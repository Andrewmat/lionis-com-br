import { Link, useLoaderData } from '@remix-run/react';
import { format, formatDistanceToNow } from 'date-fns';
import { Layout } from '~/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import type { FrontmatterMeta } from '~/lib/mdx-utils';

export async function loader() {
  const postImports = import.meta.glob(['./post.*/route.mdx', './post.*.mdx']);

  const posts = (
    await Promise.all(
      Object.entries(postImports).map(([filename, moduleResolver]) =>
        moduleResolver().then((content: unknown) => {
          if (
            content == null ||
            typeof content !== 'object' ||
            !('frontmatter' in content)
          ) {
            throw new Error('Error: no frontmatter value');
          }
          return {
            ...(content.frontmatter as FrontmatterMeta),
            slug: getPostSlug(filename),
          };
        })
      )
    )
  )
    // .filter((post) => post.published === true)
    .sort((postA, postB) =>
      new Date(postA.publishDate) < new Date(postB.publishDate) ? 1 : -1
    );

  return { posts };
}

function getPostSlug(fileName: string) {
  if (!(fileName.startsWith('./post.') && fileName.endsWith('.mdx'))) {
    throw new Error(`Unexpected flat route '${fileName}'`);
  }
  // post.*/route.mdx
  if (fileName.endsWith('/route.mdx')) {
    const [, flatName] = fileName.split('/');
    const [, slug] = flatName.split('.');
    return slug;
  }
  // post.*.mdx
  const [, flatName] = fileName.split('/');
  const [, slug] = flatName.split('.');
  return slug;
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <Layout>
      <div className="full-bleed-wrapper">
        <ul>
          {posts.map((post) => (
            <li key={post.slug} className="my-5">
              <Link to={`post/${post.slug}`}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-4xl">{post.title}</CardTitle>
                    <small
                      title={format(post.publishDate, 'dd MMM yyyy HH:mm')}
                    >
                      {formatDistanceToNow(post.publishDate)}
                    </small>
                  </CardHeader>
                  <CardContent>
                    <summary>{post.summary}</summary>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
