import { createSlice } from '@reduxjs/toolkit';

import { loadDocuments } from 'core/actions';
import { ELoadingStatus, TDocument } from 'core/types';

type TDocumentState = {
  loadingStatus: ELoadingStatus;
  list: TDocument[];
};

const initialState: TDocumentState = {
  loadingStatus: ELoadingStatus.IDLE,
  list: [],
};

const DocumentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadDocuments.pending, state => {
      state.loadingStatus = ELoadingStatus.PENDING;
    });
    builder.addCase(loadDocuments.fulfilled, (state, action) => {
      state.loadingStatus = ELoadingStatus.SUCCESS;
      state.list = action.payload.list;
    });
    builder.addCase(loadDocuments.rejected, state => {
      state.loadingStatus = ELoadingStatus.FAILURE;
      state.list = [];
    });
  },
});

export default DocumentsSlice.reducer;
