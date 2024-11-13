import 'react'

declare module 'react' {
  export const use: <T>(promise: Promise<T>) => T
}
