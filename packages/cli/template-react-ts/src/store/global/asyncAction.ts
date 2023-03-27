import { message } from 'antd';
import type { ThemeConfig } from 'antd';

import type { ThemeType } from '@/models';

import { setTheme, setLoading } from './index';
import type { AppThunk } from '../index';

const themeJsonMap = import.meta.glob<{ default: ThemeConfig } & ThemeConfig>(
  '@/styles/theme/**.json',
);

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
