import { createAsyncThunk } from '@reduxjs/toolkit';

import { InvitationsServices } from 'core/services';
import { TAppState } from 'core/store';
import { TInvitation } from 'core/types';

export const loadInvitations = createAsyncThunk<
  { list: TInvitation[]; count: number },
  undefined,
  { state: TAppState }
>('invitations/loadInvitations', async (_, { rejectWithValue, getState }) => {
  try {
    const projectId = getState().projects?.current?.id;
    return await InvitationsServices.search({ projectId });
  } catch (error) {
    return rejectWithValue(error);
  }
});
