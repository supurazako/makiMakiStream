import "@remix-run/server-runtime";

declare module "@remix-run/server-runtime" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
    };
  }
}
