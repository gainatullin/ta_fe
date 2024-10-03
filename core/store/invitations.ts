import { createSlice } from '@reduxjs/toolkit';

import { loadInvitations } from 'core/actions/invitations';
import { ELoadingStatus, TInvitation } from 'core/types';

type TInvitationsState = {
  loadingStatus: ELoadingStatus;
  list: TInvitation[];
};

const initialState: TInvitationsState = {
  loadingStatus: ELoadingStatus.IDLE,
  list: [],
};

const InvitationsSlice = createSlice({
  name: 'invitations',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadInvitations.pending, state => {
      state.loadingStatus = ELoadingStatus.PENDING;
    });
    builder.addCase(loadInvitations.fulfilled, (state, action) => {
      state.loadingStatus = ELoadingStatus.SUCCESS;
      state.list = action.payload.list;
    });
    builder.addCase(loadInvitations.rejected, state => {
      state.loadingStatus = ELoadingStatus.FAILURE;
      state.list = [];
    });
  },
});

export default InvitationsSlice.reducer;
