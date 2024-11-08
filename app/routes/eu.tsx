import { Link } from '@remix-run/react';
import { Layout } from '~/components/layout';
import { Badge } from '~/components/ui/badge';
import { cn } from '~/lib/utils';
import photoUrl from '~/images/lionis-profile.jpg?url';
import styles from '../styles/social-theme.module.css';

export default function EuPage() {
  return (
    <Layout>
      <div className={cn(styles.vars, 'full-bleed-wrapper')}>
        <article className="flex flex-col gap-2 leading-7">
          <h1 className="text-4xl">Eu, lionis</h1>

          <p>
            brasileiro, ~30 anos, dev frontend, com o objetivo profissional de
            habilitar pessoas a terem o poder de fazer o que precisam.
          </p>
          <p>
            no código, eu gosto de simplicidade e fazer uma experiência de dev
            legal. Amo criar um código que qualquer um possa pegar de primeira,
            mesmo se o código não esteja de acordo com as &quot;boas
            maneiras&quot;
          </p>
          <p>
            da vida, tenho uma doguinha chamada tirissa, sou uma pessoa ansiosa,
            e quero ser um saldo positivo no mundo
          </p>
          <p>
            gosto de jogos single player, jogos de tabuleiro, cubos mágicos, e
            compro bastante livro mas não leio nenhum
          </p>
          <div className="flex gap-2">
            <Link
              to="https://bsky.app/profile/lionis.com.br"
              target="_blank"
              rel="noreferrer"
            >
              <Badge
                className={cn(
                  'bg-[var(--bsky)] text-[var(--bsky-foreground)]',
                  'hover:bg-[var(--bsky-focus)] hover:text-[var(--bsky-foreground-focus)] hover:underline',
                  'focus-visible:bg-[var(--bsky-focus)] focus-visible:text-[var(--bsky-foreground-focus)] focus-visible:underline'
                )}
              >
                bluesky
              </Badge>
            </Link>
            <Link
              to="https://www.threads.net/@andre.lionis"
              target="_blank"
              rel="noreferrer"
            >
              <Badge
                className={cn(
                  'bg-[var(--threads)] text-[var(--threads-foreground)]',
                  'hover:bg-[var(--threads-focus)] hover:text-[var(--threads-foreground-focus)] hover:underline',
                  'focus-visible:bg-[var(--threads-focus)] focus-visible:text-[var(--threads-foreground-focus)] focus-visible:underline'
                )}
              >
                threads
              </Badge>
            </Link>
            <Link
              to="https://github.com/Andrewmat"
              target="_blank"
              rel="noreferrer"
            >
              <Badge
                className={cn(
                  'bg-[var(--github)] text-[var(--github-foreground)]',
                  'hover:bg-[var(--github-focus)] hover:text-[var(--github-foreground-focus)] hover:underline',
                  'focus-visible:bg-[var(--github-focus)] focus-visible:text-[var(--github-foreground-focus)] focus-visible:underline'
                )}
              >
                github
              </Badge>
            </Link>
          </div>
        </article>
        <img
          src={photoUrl}
          alt="Minha foto de perfil. Branco, loiro"
          className="w-[100px] rounded-full ms-auto mt-8"
        />
      </div>
    </Layout>
  );
}
