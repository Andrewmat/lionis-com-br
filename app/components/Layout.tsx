import type { PropsWithChildren } from 'react';
import { ModeToggle } from './mode-toggle';
import { Link } from '@remix-run/react';
import { Button } from './ui/button';

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="grid min-h-dvh grid-rows-[100px_1fr_100px]">
      <header className="bg-black/20 dark:bg-white/10 px-5 flex justify-between items-center">
        <Link to="/">Eu, Lionis</Link>
        <ModeToggle />
      </header>
      <main className="py-4 px-5">{children}</main>
      <footer className="bg-black/20 dark:bg-white/10 px-5 flex justify-between items-center">
        <div>
          Made by{' '}
          <Button variant="link" asChild className="px-0">
            <Link to="https://github.com/Andrewmat">@andrewmat</Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}
