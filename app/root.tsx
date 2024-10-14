import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import clsx from 'clsx';
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from 'remix-themes';
import { themeSessionResolver } from './theme.server';
import './tailwind.css';
import './global.css';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
}

function LayoutWithProviders(props: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();

  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <Layout {...props} />
    </ThemeProvider>
  );
}
export { LayoutWithProviders as Layout };

function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  return (
    <html lang="pt-BR" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="root">{children}</div>
        <ScrollRestoration />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}