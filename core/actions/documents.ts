import { createAsyncThunk } from '@reduxjs/toolkit';

import { DocumentsServices } from 'core/services';
import { TAppState } from 'core/store';
import { TDocument } from 'core/types';

export const loadDocuments = createAsyncThunk<{ list: TDocument[]; count: number }, undefined, { state: TAppState }>(
  'documents/loadDocument',
  async (_, { rejectWithValue, getState }) => {
    try {
      const projectId = getState().projects?.current?.id;
      return await DocumentsServices.search({ projectId });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
