import { createCookieSessionStorage } from '@remix-run/node'
import { createThemeSessionResolver } from 'remix-themes'

// You can default to 'development' if process.env.NODE_ENV is not set
const isProduction = import.meta.env.PROD

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: 'theme',
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secrets: [process.env.APP_SECRET],
    // Set domain and secure only if in production
    ...(isProduction
      ? {
          domain: 'your-production-domain.com',
          secure: true,
        }
      : {}),
  },
})

export const themeSessionResolver =
  createThemeSessionResolver(themeStorage)
