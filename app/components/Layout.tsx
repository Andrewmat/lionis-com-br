import type { PropsWithChildren } from 'react';
import { ModeToggle } from './mode-toggle';
import { Link } from '@remix-run/react';

export function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <header className="min-h-36 bg-white/10 px-6 flex justify-between items-center">
        <Link to="/">Eu, Lionis</Link>
        <ModeToggle />
      </header>
      <main className="my-4">{children}</main>
      <footer className="min-h-36 bg-white/10">Footer</footer>
    </div>
  );
}
