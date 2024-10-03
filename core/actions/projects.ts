import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAvatarSrc } from 'core/helpers';
import { ProjectsServices } from 'core/services';
import { TAppState } from 'core/store';
import { TProject } from 'core/types';

export const loadProjects = createAsyncThunk<TProject[], undefined, { state: TAppState }>(
  'projects/loadProjects',
  async (_, { rejectWithValue }) => {
    try {
      const rs = await ProjectsServices.search({});
      return rs.list.map((project: TProject) => ({
        ...project,
        avatarSrc: getAvatarSrc('projects', project.id),
      }));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
