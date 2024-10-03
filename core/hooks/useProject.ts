import { useCallback, useEffect } from 'react';

import { loadComponents, loadDocuments, loadInvitations, loadIssues, loadShortcuts, loadUsers } from 'core/actions';
import { useAppDispatch, useAppSelector } from 'core/hooks';
import { ProjectsServices } from 'core/services';
import { setCurrentProject } from 'core/store';

export const useProject = (ticket: string) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(state => state.projects.current);

  const loadProject = useCallback(() => {
    if (ticket) {
      ProjectsServices.get({ ticket: ticket })
        .then(rs => {
          dispatch(setCurrentProject(rs));
          dispatch(loadUsers());
          dispatch(loadIssues());
          dispatch(loadComponents());
          dispatch(loadDocuments());
          dispatch(loadShortcuts());
          dispatch(loadInvitations());
        })
        .catch(() => {});
    }
  }, [ticket, dispatch]);

  useEffect(() => {
    loadProject();
  }, [ticket, loadProject]);

  return project;
};
