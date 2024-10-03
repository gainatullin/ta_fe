import Router from 'next/router';
import { createSlice } from '@reduxjs/toolkit';

import { getSelf } from 'core/actions';
import { getAvatarSrc } from 'core/helpers';
import { EGetSelfType, ELoadingStatus, TUser } from 'core/types';

type TSessionState = {
  getSelfStatus: ELoadingStatus;
  user: TUser | null;
};

const initialState: TSessionState = {
  getSelfStatus: ELoadingStatus.IDLE,
  user: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.getSelfStatus = ELoadingStatus.IDLE;
    },
    setAvatarSrc: state => {
      if (state.user) {
        state.user.avatarSrc = getAvatarSrc('projects', state.user.id, true);
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getSelf.pending, state => {
      state.getSelfStatus = ELoadingStatus.PENDING;
    });
    builder.addCase(getSelf.fulfilled, (state, action) => {
      state.getSelfStatus = ELoadingStatus.SUCCESS;
      state.user = action.payload.user;
      if (action.payload.getSelfType !== EGetSelfType.INIT && action.payload.getSelfType !== EGetSelfType.UPDATE) {
        Router.push('/my');
      }
    });
    builder.addCase(getSelf.rejected, state => {
      state.getSelfStatus = ELoadingStatus.FAILURE;
      state.user = null;
    });
  },
});

export const { logout, setAvatarSrc } = sessionSlice.actions;

export default sessionSlice.reducer;
