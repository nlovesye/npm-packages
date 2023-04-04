import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import zhCN from 'antd/locale/zh_CN';

import type { GlobalState } from '@/models';
import defaultTheme from '@/styles/theme/default.json';

export const initialState: GlobalState = {
  loading: false,
  themeType: 'default',
  theme: defaultTheme,
  localeType: 'zh_CN',
  antdLocale: zhCN,
};

// slice
export const globalSlice = createSlice({
  name: 'global', // namespace
  initialState,
  reducers: {
    setLoading: (state: GlobalState, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setTheme: (
      state: GlobalState,
      {
        payload: { loading, themeType, theme },
      }: PayloadAction<Pick<GlobalState, 'theme' | 'themeType' | 'loading'>>,
    ) => {
      state.loading = loading;
      state.themeType = themeType;
      state.theme = theme;
    },
    setLocale: (
      state: GlobalState,
      {
        payload: { loading, localeType, antdLocale },
      }: PayloadAction<Pick<GlobalState, 'localeType' | 'antdLocale' | 'loading'>>,
    ) => {
      state.loading = loading;
      state.localeType = localeType;
      state.antdLocale = antdLocale;
    },
  },
});

// actions
export const { setTheme, setLoading, setLocale } = globalSlice.actions;

// reducer
export default globalSlice.reducer;
