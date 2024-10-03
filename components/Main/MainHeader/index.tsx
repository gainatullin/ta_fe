import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Popover } from 'antd';

import { logout } from 'core/actions';
import { getQueryParam } from 'core/helpers';
import { useAppDispatch, useAppSelector } from 'core/hooks';
import { openModal } from 'core/store';

import ProjectsHeaderList from 'components/Projects/ProjectsListHeader';
import UserMenu from 'components/User/UserMenu';

const MainHeader = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(state => state.session.user);
  const project = useAppSelector(state => state.projects.current);
  const [isProjectsListVisible, setIsProjectsListVisible] = useState(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);

  useEffect(() => {
    const i = getQueryParam('i');
    const c = getQueryParam('c');
    if (i && c) {
      dispatch(openModal({ type: 'signController', values: { i, c } }));
    }
  }, [dispatch]);

  const handleLogout = () => {
    setIsUserMenuVisible(false);
    dispatch(logout());
  };

  const handleNavigation = (path: string) => {
    setIsProjectsListVisible(false);
    setIsUserMenuVisible(false);
    router.push(path);
  };

  const handleClickSign = () => {
    dispatch(openModal({ type: 'signController' }));
  };

  const handleCreateProject = () => {
    setIsProjectsListVisible(false);
    dispatch(openModal({ name: 'Create project', type: 'createProject' }));
  };

  const handleCreateIssue = () => {
    dispatch(openModal({ name: 'Create issue', type: 'createIssue' }));
  };

  return (
    <header>
      <nav>
        <Button type="text" onClick={() => router.push('/')}>
          Team area
        </Button>
        {Boolean(user) && (
          <>
            <Button type="link" onClick={() => router.push('/my')}>
              My work
            </Button>
            <Popover
              placement="bottom"
              trigger="click"
              visible={isProjectsListVisible}
              onVisibleChange={() => setIsProjectsListVisible(!isProjectsListVisible)}
              content={<ProjectsHeaderList onCreate={handleCreateProject} onNavigate={handleNavigation} />}
            >
              <Button type="link">Projects</Button>
            </Popover>
            {Boolean(project) && (
              <Button size="small" type="primary" onClick={handleCreateIssue}>
                Create issue
              </Button>
            )}
          </>
        )}
      </nav>
      <div>
        {Boolean(user) ? (
          <Popover
            placement="leftTop"
            trigger="click"
            visible={isUserMenuVisible}
            onVisibleChange={() => setIsUserMenuVisible(!isUserMenuVisible)}
            content={<UserMenu onLogout={handleLogout} onNavigate={handleNavigation} />}
          >
            <Button type="text" shape="circle">
              <Avatar size="small" src={user?.avatarSrc} />
            </Button>
          </Popover>
        ) : (
          <Button type="link" icon={<UserOutlined />} onClick={handleClickSign} />
        )}
      </div>
    </header>
  );
};

export default MainHeader;
