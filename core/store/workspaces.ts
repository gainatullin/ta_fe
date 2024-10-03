import { createSlice } from '@reduxjs/toolkit';

import { loadWorkspaces } from 'core/actions';
import { ELoadingStatus, TWorkspace } from 'core/types';

type TWorkspacesState = {
  loadingStatus: ELoadingStatus;
  list: TWorkspace[];
};

const initialState: TWorkspacesState = {
  loadingStatus: ELoadingStatus.IDLE,
  list: [],
};

const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadWorkspaces.pending, state => {
      state.loadingStatus = ELoadingStatus.PENDING;
    });
    builder.addCase(loadWorkspaces.fulfilled, (state, action) => {
      state.loadingStatus = ELoadingStatus.SUCCESS;
      state.list = action.payload.list;
    });
    builder.addCase(loadWorkspaces.rejected, state => {
      state.loadingStatus = ELoadingStatus.FAILURE;
      state.list = [];
    });
  },
});

export default workspacesSlice.reducer;
