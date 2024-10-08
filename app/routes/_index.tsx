import type { MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export function loader() {
  const posts = import.meta.glob('./post.*.mdx', {
    eager: true,
  });

  return {
    posts: Object.entries(posts).map(([file, v]) => ({ ...v, file })),
  };
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>lionis.com.br</h1>
      <ul>
        {loaderData.posts.map(({ frontmatter, file }) => (
          <li key={file}>
            <Link to={`post/${frontmatter.slug}`}>
              {frontmatter.title} ({file})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
