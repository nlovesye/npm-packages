import { useEffect } from 'react';

import { useAppDispatch } from '@/store';
import { fetchUserInfo } from '@/store/user/asyncAction';

export function useActions() {
  const dispatch = useAppDispatch();

  // console.log('useActions');

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);
}
