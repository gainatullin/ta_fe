import { createAsyncThunk } from '@reduxjs/toolkit';

import { ProjectsServices } from 'core/services';
import { TAppState } from 'core/store';
import { TUser } from 'core/types';

export const loadUsers = createAsyncThunk<{ list: TUser[]; count: number }, undefined, { state: TAppState }>(
  'users/loadUsers',
  async (_, { rejectWithValue, getState }) => {
    try {
      const id = getState().projects?.current?.id;
      return await ProjectsServices.usersSearch({ id });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
