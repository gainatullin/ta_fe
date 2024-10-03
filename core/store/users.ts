import { createSlice } from '@reduxjs/toolkit';

import { loadUsers } from 'core/actions';
import { ELoadingStatus, TUser } from 'core/types';

type TUsersState = {
  loadingStatus: ELoadingStatus;
  list: TUser[];
};

const initialState: TUsersState = {
  loadingStatus: ELoadingStatus.IDLE,
  list: [],
};

const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => {
      state.loadingStatus = ELoadingStatus.PENDING;
    });
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.loadingStatus = ELoadingStatus.SUCCESS;
      state.list = action.payload.list;
    });
    builder.addCase(loadUsers.rejected, state => {
      state.loadingStatus = ELoadingStatus.FAILURE;
      state.list = [];
    });
  },
});

export default UsersSlice.reducer;
