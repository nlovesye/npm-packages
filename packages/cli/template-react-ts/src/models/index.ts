import type { ThemeConfig } from 'antd';
import type { Locale } from 'antd/es/locale';

export type ThemeType = 'default' | 'dark';
export type LocaleType = 'zh_CN' | 'en_US';

export interface GlobalState {
  loading: boolean;
  themeType: ThemeType;
  theme: ThemeConfig;
  localeType: LocaleType;
  antdLocale: Locale;
}

export interface User {
  name: string;
}
