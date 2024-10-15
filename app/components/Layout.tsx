import type { PropsWithChildren } from 'react';
import { ModeToggle } from './mode-toggle';
import { Link } from '@remix-run/react';
import { Button } from './ui/button';

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="grid min-h-dvh grid-rows-[80px_1fr_80px]">
      <header className="bg-secondary/80 dark:bg-secondary/90 px-5 flex items-center sticky top-0 backdrop-blur-sm">
        <div className="flex w-full justify-between items-center">
          <Link to="/">Eu, Lionis</Link>
          <ModeToggle />
        </div>
      </header>
      <main className="py-4 px-5">{children}</main>
      <footer className="bg-secondary/80 dark:bg-secondary/90 px-5 flex justify-between items-center">
        <div>
          Made by{' '}
          <Button variant="link" asChild className="px-0">
            <Link
              to="https://github.com/Andrewmat"
              target="_blank"
              rel="noreferrer"
            >
              @andrewmat
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}
