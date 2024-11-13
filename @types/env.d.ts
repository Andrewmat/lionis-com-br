declare namespace NodeJS {
  interface ProcessEnv {
    APP_SECRET: string
  }
}
interface ImportMetaEnv {
  readonly APP_SECRET: undefined
}
