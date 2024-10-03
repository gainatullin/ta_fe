import { createSlice } from '@reduxjs/toolkit';

import { loadProjects } from 'core/actions';
import { getAvatarSrc } from 'core/helpers';
import { ELoadingStatus, TProject } from 'core/types';

type TProjectsState = {
  loadingStatus: ELoadingStatus;
  list: TProject[];
  current: TProject | null;
};

const initialState: TProjectsState = {
  loadingStatus: ELoadingStatus.IDLE,
  list: [],
  current: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentProject: (state, action) => {
      state.current = { ...action.payload, avatarSrc: getAvatarSrc('projects', action.payload.id) };
    },
    updateAvatarSrc: state => {
      if (state.current) {
        state.current.avatarSrc = getAvatarSrc('projects', state.current.id, true);
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(loadProjects.pending, state => {
      state.loadingStatus = ELoadingStatus.PENDING;
    });
    builder.addCase(loadProjects.fulfilled, (state, action) => {
      state.loadingStatus = ELoadingStatus.SUCCESS;
      state.list = action.payload;
    });
    builder.addCase(loadProjects.rejected, state => {
      state.loadingStatus = ELoadingStatus.FAILURE;
      state.list = [];
    });
  },
});

export const { setCurrentProject, updateAvatarSrc } = projectsSlice.actions;

export default projectsSlice.reducer;
