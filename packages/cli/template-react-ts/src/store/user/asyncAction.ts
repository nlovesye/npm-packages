import { getUserInfoMock } from '@/api/user';

import { setLoading, updateUserName } from './index';
import type { AppThunk } from '../index';

export const fetchUserInfo = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  getUserInfoMock().then(async (user) => {
    dispatch(updateUserName(user.name));
    dispatch(setLoading(false));
  });
};
