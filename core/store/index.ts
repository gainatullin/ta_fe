import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import ComponentSlice from 'core/store/components';
import DocumentsSlice from 'core/store/documents';
import InvitationsSlice from 'core/store/invitations';
import IssuesSlice from 'core/store/issues';
import ModalSLice from 'core/store/modal';
import ProjectsSlice from 'core/store/projects';
import SessionSlice from 'core/store/session';
import ShortcutsSlice from 'core/store/shortcuts';
import UsersSlice from 'core/store/users';
import WorkspacesSlice from 'core/store/workspaces';

export const store = configureStore({
  reducer: {
    session: SessionSlice,
    workspaces: WorkspacesSlice,
    projects: ProjectsSlice,
    components: ComponentSlice,
    issues: IssuesSlice,
    users: UsersSlice,
    modal: ModalSLice,
    shortcuts: ShortcutsSlice,
    documents: DocumentsSlice,
    invitations: InvitationsSlice,
  },
});

export type TAppState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export type TGetState = typeof store.getState;

export type TAppThunk<ReturnType = void> = ThunkAction<ReturnType, TAppState, unknown, Action<string>>;

export * from './documents';
export * from './invitations';
export * from './issues';
export * from './modal';
export * from './projects';
export * from './session';
export * from './shortcuts';
export * from './users';
export * from './workspaces';
