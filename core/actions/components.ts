import { createAsyncThunk } from '@reduxjs/toolkit';

import { ComponentServices } from 'core/services';
import { TAppState } from 'core/store';
import { TComponent } from 'core/types';

export const loadComponents = createAsyncThunk<{ list: TComponent[]; count: number }, undefined, { state: TAppState }>(
  'components/loadComponents',
  async (_, { rejectWithValue, getState }) => {
    try {
      const projectId = getState().projects?.current?.id;
      return await ComponentServices.search({ projectId });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
