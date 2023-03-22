import type { AppState } from '@/store';

export const isAdminSelector = (state: AppState) => state.user.name === '管理员';
