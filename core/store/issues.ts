import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TAppState } from 'core/store';
import { ELoadingStatus, TFilters, TIssue } from 'core/types';

type TIssuesState = {
  loadingStatus: ELoadingStatus;
  list: TIssue[];
  filters: TFilters;
};

const initialState: TIssuesState = {
  loadingStatus: ELoadingStatus.IDLE,
  list: [],
  filters: { name: '', users: [], components: [] },
};

const IssuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setIssues: (state, action: PayloadAction<TIssue[]>) => {
      state.list = action.payload;
    },
    setIssue: (state, action: PayloadAction<TIssue>) => {
      const index = state.list.findIndex(issue => issue.id === action.payload.id);
      state.list[index] = action.payload;
    },
    setFilters: (state, action: PayloadAction<TFilters>) => {
      state.filters = action.payload;
    },
  },
});

export const issuesSelector = createSelector(
  (state: TAppState) => state.issues.list,
  (state: TAppState) => state.issues.filters,
  (_: any, { isBacklog }: { isBacklog: boolean }) => isBacklog,
  (issues: TIssue[], filters: TFilters, isBacklog: boolean) =>
    issues
      .filter(issue => issue.isBacklog === isBacklog)
      .filter(issue => (Boolean(filters.name) ? issue.name.toLowerCase().includes(filters.name.toLowerCase()) : true))
      .filter(issue => (filters.users.length > 0 ? issue.assignee && filters.users.includes(issue.assignee.id) : true))
      .filter(issue =>
        filters.components.length > 0 ? issue.component && filters.components.includes(issue.component.id) : true,
      ),
);

export const isFilteredSelector = createSelector(
  (state: TAppState) => state.issues.filters,
  filters => filters.users.length > 0 || filters.components.length > 0 || filters.name.length > 0,
);

export const { setIssue, setFilters, setIssues } = IssuesSlice.actions;

export default IssuesSlice.reducer;
