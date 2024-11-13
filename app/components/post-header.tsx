import { format, formatDistanceToNow } from 'date-fns'
import type { PostFrontmatter } from '~/lib/mdx-utils'

export function PostHeader(props: PostFrontmatter) {
  return (
    <div className='mb-4'>
      <h1 className='text-4xl mb-1'>{props.title}</h1>
      <small
        title={format(
          props.publishDate,
          'dd MMM yyyy HH:mm',
        )}
      >
        {formatDistanceToNow(props.publishDate, {
          addSuffix: true,
        })}
      </small>
    </div>
  )
}
