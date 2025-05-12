// src/declaration.d.ts
declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}
interface ImportMetaEnv {
  readonly VITE_BASE_API_URI: string
  // add more VITE_... env vars if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}