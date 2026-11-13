// require.context, which Turbopack and webpack both provide, for project.tsx.
declare namespace NodeJS {
  interface Require {
    context(
      directory: string,
      recursive?: boolean,
      filter?: RegExp,
    ): { keys(): string[]; (id: string): unknown }
  }
}
