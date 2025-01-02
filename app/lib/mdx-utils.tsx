import type { LoaderFunction } from '@remix-run/node'
import type { MetaDescriptor } from '@remix-run/react'
import { format, formatDistanceToNow } from 'date-fns'
import logoUrl from '~/images/logo.svg?url'
import { Badge } from '~/components/ui/badge'
import { WEBSITE_URL } from './const'

export type PostFrontmatter = {
  title: string
  published: boolean
  publishDate: string
  lastUpdateDate: string
  description?: string
  summary?: string
  tags?: string[]
}

/** transforms mdx frontmatter metadata to remix metadata */
export function getMeta(
  frontmatter: PostFrontmatter,
): MetaDescriptor[] {
  const authorUrl = new URL(WEBSITE_URL)
  authorUrl.pathname = '/eu'
  return [
    { title: `${frontmatter.title} | Eu, Lionis` },
    { description: frontmatter.description },
    {
      name: 'og:description',
      content: frontmatter.description,
    },
    { name: 'og:image', content: logoUrl },
    {
      name: 'article:author',
      content: authorUrl,
    },
    ...(frontmatter.tags ?? []).map((content) => ({
      name: 'article:tag',
      content,
    })),
  ]
}

export function getLoader(
  frontmatter: PostFrontmatter,
): LoaderFunction {
  if (import.meta.env.DEV) {
    return () => null
  }
  if (frontmatter.published !== true) {
    return () => {
      throw new Response('Not Found', { status: 404 })
    }
  }
  return () => {
    return null
  }
}

export function PostHeader(props: PostFrontmatter) {
  return (
    <div className='mb-4 flex flex-col gap-2'>
      <h1 className='text-4xl'>{props.title}</h1>
      {props.tags && (
        <div className='flex gap-2'>
          {props.tags.map((tag) => (
            <Badge key={tag} variant='outline'>
              {tag}
            </Badge>
          ))}
        </div>
      )}
      <small>
        <DateFormat date={Number(props.publishDate)} />
      </small>
    </div>
  )
}

function DateFormat({ date }: { date: number }) {
  const absolute = format(date, 'dd MMM yyyy HH:mm')
  const relative = formatDistanceToNow(date, {
    addSuffix: true,
  })
  return <span title={absolute}>{relative}</span>
}
