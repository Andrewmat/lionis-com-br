import { resolve } from 'node:path'
import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import { rehypePrettyCode } from 'rehype-pretty-code'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeColorChips from 'rehype-color-chips'
import { netlifyPlugin } from '@netlify/remix-adapter/plugin'

const mdxConfig = mdx({
  remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
  rehypePlugins: [
    [
      rehypePrettyCode,
      {
        theme: {
          dark: 'rose-pine',
          light: 'rose-pine-dawn',
        },
      },
    ],
    rehypeColorChips,
  ],
  providerImportSource: '@mdx-js/react',
})

const viteConfig = defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdxConfig,
    },
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    netlifyPlugin(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, './app'),
    },
  },
})

export default viteConfig
