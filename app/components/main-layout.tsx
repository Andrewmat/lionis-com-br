import type { PropsWithChildren } from 'react';
import { ModeToggle } from './mode-toggle';
import { Link } from '@remix-run/react';
import { Button } from './ui/button';
import logo from '../images/logo.svg?url';

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="grid min-h-dvh grid-rows-[var(--header-height)_1fr_80px]">
      <header className="px-5 flex items-center sticky top-0 backdrop-blur-md">
        <div className="flex w-full justify-between items-center max-w-[80ch] mx-auto">
          <Link to="/">
            <img src={logo} alt="" height="60" width="60" />
          </Link>

          <Button asChild variant="link" className="ms-auto">
            <Link to="/eu">Sobre mim</Link>
          </Button>
          <ModeToggle />
        </div>
      </header>
      <main className="py-4 px-5">{children}</main>
      <footer className="bg-secondary text-secondary-foreground px-5 flex justify-between items-center">
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
