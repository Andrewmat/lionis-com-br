import { resolve } from 'node:path';
import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeHighlight from 'rehype-highlight';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import mdx from '@mdx-js/rollup';

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [rehypeHighlight],
        providerImportSource: '@mdx-js/react',
      }),
    },
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, './app'),
    },
  },
});
