/*
  eslint-disable
    jsx-a11y/heading-has-content,
    jsx-a11y/anchor-has-content,
    jsx-a11y/anchor-is-valid
*/
import type { MDXComponents } from 'node_modules/@mdx-js/react/lib';
import { cloneElement, type ReactElement } from 'react';
import { cn } from '~/lib/utils';

export const components: MDXComponents = {
  h1: mergeElement(<h1 className="text-4xl" />),
  h2: mergeElement(<h2 className="text-2xl" />),
  p: mergeElement(<p className="mb-4 mt-2" />),
  a: mergeElement(<a className="underline" />),
  ul: mergeElement(<ul className="list-disc list-inside mb-4 mt-2" />),
  ol: mergeElement(<ol className="list-decimal list-inside mb-4 mt-2" />),
  code: mergeElement(
    <code className="inline-block px-0.5 py-0 rounded-sm text-secondary-foreground bg-secondary" />
  ),
  pre: mergeElement(<pre className="mb-4 mt-2" />),
};

function mergeElement(element: ReactElement) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const MergedComponent = (props: {}) =>
    cloneElement(element, mergeProps(element.props, props));
  MergedComponent.displayName = String(element.type);
  return MergedComponent;
}

function mergeProps(
  props1: { className?: string },
  props2: { className?: string }
) {
  return {
    ...props1,
    ...props2,
    className: cn(props1.className, props2.className),
  };
}
