import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { User } from '@/models';

interface UserInfo extends User {
  loading: boolean;
}

const initialState: UserInfo = {
  name: '游客',
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserName: (state: UserInfo, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setLoading: (state: UserInfo, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { updateUserName, setLoading } = userSlice.actions;

export default userSlice.reducer;
