import type { ComponentType } from 'react'

export async function importMetadata<TMetadata>(
  imports: Record<string, () => Promise<unknown>>,
) {
  const entries = await Promise.all(
    Object.entries(imports).map(
      ([filename, moduleResolver]) =>
        moduleResolver().then((content) => {
          if (
            content == null ||
            typeof content !== 'object' ||
            !('frontmatter' in content) ||
            !('default' in content)
          ) {
            throw new Error('Incorrect MDX')
          }
          return [
            filename,
            content.frontmatter as TMetadata,
            content.default as ComponentType,
          ] as const
        }),
    ),
  )
  return entries
}
