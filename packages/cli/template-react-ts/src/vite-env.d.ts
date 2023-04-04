/// <reference types="vite/client" />
import type { resources } from '@/locale';

// interface ImportMetaEnv {
//   readonly VITE_NODE_ENV: string;
// }

// interface ImportMeta {
//   readonly env: ImportMetaEnv;
// }

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)['zh_CN'];
  }
}
