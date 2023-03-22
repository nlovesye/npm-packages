/**
 * 更多用法参阅: https://redux-toolkit.js.org/usage/usage-with-typescript
 */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import type { AnyAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { ThunkAction } from 'redux-thunk';
import { createLogger } from 'redux-logger';

import globalSlice from '@/store/global';
import userReducer from '@/store/user';

const reducer = combineReducers({ global: globalSlice, user: userReducer });

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger({ collapsed: true })),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AnyAction>;

export default store;
