import type { LoaderFunction } from '@remix-run/node'
import type { MetaDescriptor } from '@remix-run/react'
import { format, formatDistanceToNow } from 'date-fns'
import { Badge } from '~/components/ui/badge'

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
  return [
    { title: `${frontmatter.title} | Eu, Lionis` },
    { description: frontmatter.description },
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
