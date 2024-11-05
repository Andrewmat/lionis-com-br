import { useEffect } from 'react';
import { Link, Outlet, useRouteError } from '@remix-run/react';
import { MDXProvider } from '@mdx-js/react';
import { Layout } from '~/components/Layout';
import { components } from '~/components/post-preset';
import codeTheme from '~/styles/code-theme.css?url';
import { CopyIcon, Frown } from 'lucide-react';
import type { LinksFunction } from '@remix-run/node';
import { Button } from '~/components/ui/button';
import { toast } from '~/hooks/use-toast';

export const links: LinksFunction = () => [
  {
    href: codeTheme,
    rel: 'stylesheet',
  },
];

export default function PostPage() {
  return (
    <Layout>
      <article className="full-bleed-wrapper gap-y-2 leading-7">
        <MDXProvider components={components}>
          <Outlet />
        </MDXProvider>
      </article>
    </Layout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  useEffect(() => {
    console.error(error);
  }, [error]);

  const errorMessage = String(
    (() => {
      if (error instanceof Error) {
        return error.stack;
      } else if (
        typeof error === 'object' &&
        error != null &&
        'message' in error
      ) {
        return error.message;
      } else {
        return String(error);
      }
    })()
  );

  async function onCopyClick() {
    try {
      await copyToClipboard(errorMessage);
      toast({ title: 'Link copiado', duration: 1500 });
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Houve um erro ao copiar o link',
        duration: 5000,
      });
    }
  }

  return (
    <Layout>
      <div className="full-bleed-wrapper gap-y-2 leading-7">
        <div className="w-full flex gap-4 items-center">
          <Frown className="w-[125px] h-[125px]" />{' '}
          <h1 className="text-6xl">Ops!</h1>
        </div>
        <p>Aconteceu um erro aqui</p>
        <p>
          Se quiser, pode enviar pra
          <Button className="inline p-2" variant="link" asChild>
            <Link to="mailto:andre.m.santos1@gmail.com">
              andre.m.santos1@gmail.com
            </Link>
          </Button>
        </p>
        <p>
          Ou mandar uma mensagem pra mim no
          <Button className="inline p-2" variant="link" asChild>
            <Link
              to="https://github.com/Andrewmat"
              target="_blank"
              rel="noreferrer"
            >
              Github (@Andrewmat)
            </Link>
          </Button>
        </p>
        <p>
          Essa é a mensagem:
          <Button variant="ghost" className="p-1" onClick={onCopyClick}>
            <CopyIcon className="h-[0.75em]" />
            <span className="sr-only">Copiar</span>
          </Button>
        </p>

        <textarea
          rows={10}
          readOnly
          value={errorMessage}
          className="bg-muted text-muted-foreground p-2 font-mono"
        />
      </div>
    </Layout>
  );
}

async function copyToClipboard(content: string) {
  await navigator.clipboard.writeText(content);
}
