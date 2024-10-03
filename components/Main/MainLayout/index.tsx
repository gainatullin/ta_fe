import { ReactElement, useEffect } from 'react';

import { getSelf, loadProjects, loadWorkspaces } from 'core/actions';
import { useAppDispatch, useAppSelector } from 'core/hooks';
import { EGetSelfType } from 'core/types';

import AccessLayout from 'components/Main/AccessLayout';
import MainHeader from 'components/Main/MainHeader';

interface IProps {
  isUser?: boolean;
  children: any;
}

const MainLayout = ({ children, isUser = false }: IProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getSelf(EGetSelfType.INIT));
  }, [dispatch]);

  useEffect(() => {
    if (Boolean(user)) {
      dispatch(loadProjects());
      dispatch(loadWorkspaces());
    }
  }, [user, dispatch]);

  return (
    <>
      <MainHeader />
      <main>{isUser ? <AccessLayout>{children}</AccessLayout> : children}</main>
    </>
  );
};

export default MainLayout;

export function getMainLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
}

export function getMainLayoutWithAuth(page: ReactElement) {
  return <MainLayout isUser>{page}</MainLayout>;
}
