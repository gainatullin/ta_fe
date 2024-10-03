import Link from 'next/link';
import { useRouter } from 'next/router';
import { PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Collapse } from 'antd';

import { useAppDispatch, useAppSelector } from 'core/hooks';
import { openModal } from 'core/store';

import DocumentsList from 'components/Documents/DocumentsList';
import ShortcutsList from 'components/Shortcuts/ShortcutsList';

import styles from './projectMenu.module.scss';

const { Panel } = Collapse;

const ProjectMenu = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const project = useAppSelector(state => state.projects.current);

  const handleCreateShortcut = () => {
    dispatch(openModal({ name: 'Create shortcut', type: 'createShortcut' }));
  };

  return (
    <div className="projectMenu">
      <div className={styles.header}>
        <div className={styles.header__avatar}>
          <Avatar src={project?.avatarSrc} />
        </div>
        <div>
          <div className={styles.header__name}>{project?.name}</div>
          <div className={styles.header__description}>{project?.description}</div>
        </div>
      </div>
      <Collapse bordered={false} defaultActiveKey={['1', '2', '3', '4']}>
        <Panel header="Planing" key="1">
          <ul>
            <li>
              <Link href={`/projects/${project?.ticket}`}>
                <a>Board</a>
              </Link>
            </li>
            <li>
              <Link href={`/projects/${project?.ticket}/backlog`}>
                <a>Backlog</a>
              </Link>
            </li>
          </ul>
        </Panel>
        <Panel
          header={
            <div className={styles.menu__wrapper}>
              <h3>Documents</h3>
              <div onClick={event => event.stopPropagation()}>
                <Button
                  size="small"
                  type="link"
                  shape="circle"
                  onClick={() => router.push(`/projects/${project?.ticket}/documents/new`)}
                >
                  <PlusOutlined />
                </Button>
              </div>
            </div>
          }
          key="2"
        >
          <DocumentsList />
        </Panel>
        <Panel
          header={
            <div className={styles.menu__wrapper}>
              <h3>Shortcuts</h3>
              <div onClick={event => event.stopPropagation()}>
                <Button size="small" type="link" shape="circle" onClick={handleCreateShortcut}>
                  <PlusOutlined />
                </Button>
              </div>
            </div>
          }
          key="3"
        >
          <ShortcutsList />
        </Panel>
        <Panel header="Settings" key="4">
          <ul>
            <li>
              <Link href={`/projects/${project?.ticket}/details`}>
                <a>Details</a>
              </Link>
            </li>
            <li>
              <Link href={`/projects/${project?.ticket}/components`}>
                <a>Components</a>
              </Link>
            </li>
            <li>
              <Link href={`/projects/${project?.ticket}/team`}>
                <a>Team</a>
              </Link>
            </li>
          </ul>
        </Panel>
      </Collapse>
    </div>
  );
};

export default ProjectMenu;
