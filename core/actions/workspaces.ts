import { createAsyncThunk } from '@reduxjs/toolkit';

import { WorkspacesServices } from 'core/services';
import { TAppState } from 'core/store';
import { TWorkspace } from 'core/types';

export const loadWorkspaces = createAsyncThunk<{ list: TWorkspace[]; count: number }, undefined, { state: TAppState }>(
  'workspaces/loadWorkspaces',
  async (_, { rejectWithValue, getState }) => {
    try {
      const userId = getState().session?.user?.id;
      return await WorkspacesServices.search({ userId });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
