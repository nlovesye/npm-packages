import { message } from 'antd';

import type { ThemeType } from '@/models';

import { setTheme, setLoading } from './index';
import type { AppThunk } from '../index';

// 异步action
export const changeThemeType =
  (themeType: ThemeType): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const targetTheme = await import(`@/config/theme/${themeType}.json`);
      if (!targetTheme && !targetTheme.default) {
        throw new Error(`未知主题: ${themeType}`);
      }
      dispatch(setTheme({ theme: targetTheme || targetTheme.default, themeType, loading: false }));
    } catch (error) {
      message.error({ key: 'tip', content: (error as any)?.message || 'unkown error' });
    }
  };
