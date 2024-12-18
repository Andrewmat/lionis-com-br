/*
  eslint-disable
    jsx-a11y/heading-has-content,
    jsx-a11y/anchor-has-content,
    jsx-a11y/alt-text,
    jsx-a11y/anchor-is-valid
*/
import { Link } from '@remix-run/react'
import type { MDXComponents } from 'node_modules/@mdx-js/react/lib'
import {
  cloneElement,
  type HTMLAttributes,
  type ReactElement,
} from 'react'
import { cn } from '~/lib/utils'
import { SectionTitle } from './section-title'

export const components: MDXComponents = {
  h1: mergeElement(
    <SectionTitle as='h1' className='text-4xl' />,
  ),
  h2: mergeElement(
    <SectionTitle as='h2' className='text-2xl' />,
  ),
  h3: mergeElement(
    <SectionTitle as='h3' className='text-xl' />,
  ),
  h4: mergeElement(
    <SectionTitle as='h4' className='text-lg' />,
  ),
  a: ({ href, ...delegatedProps }) => (
    <Link
      to={href!}
      {...mergeProps(delegatedProps, {
        className: 'underline hover:text-accent-foreground',
        // @ts-ignore
        target: href?.startsWith('http')
          ? '_blank'
          : undefined,
      })}
    />
  ),
  ul: mergeElement(<ul className='list-disc' />),
  ol: mergeElement(<ol className='list-decimal' />),
  li: mergeElement(<li className='list-outside ms-5' />),
  code: mergeElement(
    <code className='overflow-x-auto inline px-0.5 py-0 rounded-sm [:not(pre)>&]:text-secondary-foreground [:not(pre)>&]:bg-secondary [pre>&]:p-4 leading-6' />,
  ),
  figure: mergeElement(
    <figure className='overflow-x-auto' />,
  ),
  hr: mergeElement(<hr className='mb-4' />),
  blockquote: mergeElement(
    <blockquote className='ps-4 py-3 border-l-2 border-foreground italic bg-primary/20 text-primary-foreground' />,
  ),
  img: mergeElement(<img className='mx-auto' />),
}

function mergeElement(element: ReactElement) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const MergedComponent = (props: {}) =>
    cloneElement(element, mergeProps(element.props, props))
  MergedComponent.displayName = String(element.type)
  return MergedComponent
}

function mergeProps(
  props1: HTMLAttributes<HTMLAnchorElement>,
  props2: HTMLAttributes<HTMLAnchorElement>,
) {
  return {
    ...props1,
    ...props2,
    className: cn(props1.className, props2.className),
  }
}
