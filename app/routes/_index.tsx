import { Link, useLoaderData } from '@remix-run/react';
import { Layout } from '~/components/Layout';
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
      new Date(postA.date) < new Date(postB.date) ? 1 : -1
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
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="my-5">
            <Link to={`post/${post.slug}`} className="text-2xl">
              <h2>{post.title}</h2>
            </Link>
            <summary>{post.summary}</summary>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
