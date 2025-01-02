import { Link, type MetaFunction } from '@remix-run/react'
import { Layout } from '~/components/main-layout'
import { Badge } from '~/components/ui/badge'
import photoUrl from '~/images/lionis-profile.jpg?url'

export const meta: MetaFunction = () => [
  {
    name: 'og:type',
    content: 'profile',
  },
  {
    name: 'og:title',
    content: 'André Matulionis',
  },
  {
    name: 'og:image',
    content: photoUrl,
  },
  { name: 'profile:first_name', content: 'André' },
  {
    name: 'profile:last_name',
    content: 'Matulionis dos Santos',
  },
  { name: 'profile:username', content: 'lionis' },
]

export default function EuPage() {
  return (
    <Layout>
      <div className='full-bleed-wrapper'>
        <article className='flex flex-col gap-2 leading-7'>
          <h1 className='text-4xl'>Eu, lionis</h1>

          <p>
            brasileiro, ~30 anos, dev frontend, com o
            objetivo profissional de habilitar pessoas a
            terem o poder de fazer o que precisam.
          </p>
          <p>
            no código, eu gosto de simplicidade e fazer uma
            experiência de dev legal. Amo criar um código
            que qualquer um possa pegar de primeira, mesmo
            se o código não esteja de acordo com as
            &quot;boas maneiras&quot;
          </p>
          <p>
            da vida, tenho uma doguinha chamada tirissa, sou
            uma pessoa ansiosa, e quero ser um saldo
            positivo no mundo
          </p>
          <p>
            gosto de jogos single player, jogos de
            tabuleiro, cubos mágicos, e compro bastante
            livro mas não leio nenhum
          </p>
          <div className='flex gap-2'>
            {(
              [
                {
                  label: 'bluesky',
                  to: 'https://bsky.app/profile/lionis.com.br',
                },
                {
                  label: 'threads',
                  to: 'https://www.threads.net/@andre.lionis',
                },
                {
                  label: 'github',
                  to: 'https://github.com/Andrewmat',
                },
                {
                  label: 'linkedin',
                  to: 'https://www.linkedin.com/in/andremsantos1',
                },
              ] as const
            ).map(({ label, to }) => (
              <Link
                to={to}
                target='_blank'
                rel='noreferrer'
                key={to}
              >
                <Badge>{label}</Badge>
              </Link>
            ))}
          </div>
        </article>
        <img
          src={photoUrl}
          alt='Minha foto de perfil. Branco, loiro'
          className='w-[100px] rounded-full ms-auto mt-8'
        />
      </div>
    </Layout>
  )
}
