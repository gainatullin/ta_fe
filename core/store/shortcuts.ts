import { createSlice } from '@reduxjs/toolkit';

import { loadShortcuts } from 'core/actions';
import { ELoadingStatus, TShortcut } from 'core/types';

type TShortcutsState = {
  loadingStatus: ELoadingStatus;
  list: TShortcut[];
};

const initialState: TShortcutsState = {
  loadingStatus: ELoadingStatus.IDLE,
  list: [],
};

const ShortcutsSlice = createSlice({
  name: 'shortcuts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadShortcuts.pending, state => {
      state.loadingStatus = ELoadingStatus.PENDING;
    });
    builder.addCase(loadShortcuts.fulfilled, (state, action) => {
      state.loadingStatus = ELoadingStatus.SUCCESS;
      state.list = action.payload.list;
    });
    builder.addCase(loadShortcuts.rejected, state => {
      state.loadingStatus = ELoadingStatus.FAILURE;
      state.list = [];
    });
  },
});

export default ShortcutsSlice.reducer;
