import { message } from 'antd';
import type { ThemeConfig } from 'antd';
import type { Locale } from 'antd/es/locale';
import { changeLanguage } from 'i18next';

import type { LocaleType, ThemeType } from '@/models';

import { setTheme, setLoading, setLocale } from './index';
import type { AppThunk } from '../index';

const themeJsonMap = import.meta.glob<{ default: ThemeConfig } & ThemeConfig>(
  '@/styles/theme/**.json',
);
const localeJsonMap = import.meta.glob<{ antdLocale: Locale }>('@/locale/**/translation.ts');

// 异步action
export const changeThemeType =
  (themeType: ThemeType): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const targetTheme = await themeJsonMap[`/src/styles/theme/${themeType}.json`]();
      if (!targetTheme) {
        throw new Error(`未知主题: ${themeType}`);
      }
      dispatch(setTheme({ theme: targetTheme.default || targetTheme, themeType, loading: false }));
    } catch (error) {
      dispatch(setLoading(false));
      message.error({ key: 'tip', content: (error as any)?.message || 'unkown error' });
    }
  };

export const changeLocaleType =
  (localeType: LocaleType): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const targetLocale = await localeJsonMap[`/src/locale/${localeType}/translation.ts`]();
      if (!targetLocale.antdLocale) {
        throw new Error(`未知语言: ${localeType}`);
      }
      changeLanguage(localeType);
      dispatch(setLocale({ antdLocale: targetLocale.antdLocale, localeType, loading: false }));
    } catch (error) {
      message.error({ key: 'tip', content: (error as any)?.message || 'unkown error' });
      dispatch(setLoading(false));
    }
  };
