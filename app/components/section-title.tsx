import { Link } from '@remix-run/react'
import { LinkIcon } from 'lucide-react'
import {
  useReducer,
  type ComponentPropsWithoutRef,
  type MouseEventHandler,
  type Reducer,
} from 'react'
import slugify from 'slugify'
import { useToast } from '~/hooks/use-toast'
import { Button } from './ui/button'

export function SectionTitle<
  AsType extends `h${1 | 2 | 3 | 4 | 5 | 6}`,
>({
  as,
  children,
  ...props
}: ComponentPropsWithoutRef<AsType> & { as: AsType }) {
  const [slug, setSlug] = useReducer<
    Reducer<string | undefined, string>
  >(
    (_, newSlug) => slugify(newSlug).toLowerCase(),
    undefined,
  )

  const { toast } = useToast()

  const Comp = as ?? 'h1'

  const onClick: MouseEventHandler = async (e) => {
    e.preventDefault()
    const newUrl = smoothNavigate(slug!)
    try {
      await copyToClipboard(newUrl)
      toast({ title: 'Link copiado', duration: 1500 })
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Houve um erro ao copiar o link',
        duration: 5000,
      })
    }
  }

  return (
    <div className='flex gap-2 items-center mt-2 pt-2 border-t-2 border-dotted'>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        id={slug}
        className='scroll-mt-[var(--header-height)]'
      >
        {/* @ts-ignore */}
        <Comp
          {...props}
          ref={(target) => {
            if (!target || !target.textContent) return
            setSlug(target.textContent)
          }}
        >
          {children}
        </Comp>
      </a>
      <Button asChild variant='ghost' className='p-1'>
        <Link to={`#${slug}`} onClick={onClick}>
          <LinkIcon className='h-[0.75em]' />
          <span className='sr-only'>Copiar</span>
        </Link>
      </Button>
    </div>
  )
}

async function copyToClipboard(content: string) {
  await navigator.clipboard.writeText(content)
}

function smoothNavigate(id: string) {
  const elem = document.getElementById(id)
  elem?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  })

  const url = new URL(window.location.href)
  url.hash = `#${id}`
  window.history.replaceState(null, '', String(url))
  return String(url)
}
