import { createAsyncThunk } from '@reduxjs/toolkit';

import { ShortcutsServices } from 'core/services';
import { TAppState } from 'core/store';
import { TShortcut } from 'core/types';

export const loadShortcuts = createAsyncThunk<{ list: TShortcut[]; count: number }, undefined, { state: TAppState }>(
  'shortcuts/loadShortcuts',
  async (_, { rejectWithValue, getState }) => {
    try {
      const projectId = getState().projects?.current?.id;
      return await ShortcutsServices.search({ projectId });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
