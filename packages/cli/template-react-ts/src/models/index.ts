import type { ThemeConfig } from 'antd';

export type ThemeType = 'default' | 'dark';

export interface GlobalState {
  loading: boolean;
  themeType: ThemeType;
  theme: ThemeConfig;
  locale: string;
}

export interface User {
  name: string;
}
