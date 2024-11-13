import { Suspense, use, type ComponentType } from 'react'
import type { LinksFunction } from '@remix-run/node'
import { Layout } from '~/components/main-layout'
import { importMetadata } from '~/lib/import-metadata'
import {
  Card,
  CardContent,
  CardFooter,
} from '~/components/ui/card'
import { ChirpFooter } from '~/components/chirp-footer'
import { MDXProvider } from '@mdx-js/react'
import { components } from '~/components/post-preset'
import { LoaderCircle } from 'lucide-react'
import codeTheme from '~/styles/code-theme.css?url'

export const links: LinksFunction = () => [
  {
    href: codeTheme,
    rel: 'stylesheet',
  },
]

type ChirpMetadata = {
  title: string
  publishDate: number
}

type ChirpModule = readonly [
  filename: string,
  ChirpMetadata,
  ComponentType,
]

export default function ChirpRoute() {
  const promise = importMetadata<ChirpMetadata>(
    import.meta.glob(['~/content/chirps/*.mdx']),
  ).then((c) =>
    c.sort(([, chirpA], [, chirpB]) =>
      new Date(chirpA.publishDate) <
      new Date(chirpB.publishDate)
        ? 1
        : -1,
    ),
  )

  return (
    <Layout>
      <article className='full-bleed-wrapper gap-y-2 leading-7'>
        <Suspense
          fallback={
            <LoaderCircle className='m-auto w-[60px] h-[60px] animate-spin' />
          }
        >
          <Resolver promise={promise} />
        </Suspense>
      </article>
    </Layout>
  )
}

function Resolver({
  promise,
}: {
  promise: Promise<ChirpModule[]>
}) {
  const resolved = use(promise)

  return (
    <MDXProvider components={components}>
      {resolved.map(([, metadata, Component], i) => (
        <Card key={i}>
          <CardContent className='pt-6'>
            <Component />
          </CardContent>
          <CardFooter>
            <ChirpFooter {...metadata} />
          </CardFooter>
        </Card>
      ))}
    </MDXProvider>
  )
}
