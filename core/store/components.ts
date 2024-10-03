import { createSlice } from '@reduxjs/toolkit';

import { loadComponents } from 'core/actions';
import { ELoadingStatus, TComponent } from 'core/types';

type TComponentsState = {
  loadingStatus: ELoadingStatus;
  list: TComponent[];
};

const initialState: TComponentsState = {
  loadingStatus: ELoadingStatus.IDLE,
  list: [],
};

const ComponentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadComponents.pending, state => {
      state.loadingStatus = ELoadingStatus.PENDING;
    });
    builder.addCase(loadComponents.fulfilled, (state, action) => {
      state.loadingStatus = ELoadingStatus.SUCCESS;
      state.list = action.payload.list;
    });
    builder.addCase(loadComponents.rejected, state => {
      state.loadingStatus = ELoadingStatus.FAILURE;
      state.list = [];
    });
  },
});

export default ComponentsSlice.reducer;
