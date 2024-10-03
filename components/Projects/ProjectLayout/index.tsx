import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';

import { useProject } from 'core/hooks';

import MainLayout from 'components/Main/MainLayout';
import ProjectMenu from 'components/Projects/ProjectMenu';

import styles from './projectLayout.module.scss';

interface IProps {
  children: any;
}

const ProjectLayout = ({ children }: IProps) => {
  const router = useRouter();
  const ticket = router.query?.ticket as string;
  const project = useProject(ticket);

  if (!project) return null;

  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>
        <ProjectMenu />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default ProjectLayout;

export function getProjectLayout(page: ReactElement) {
  return (
    <MainLayout isUser>
      <ProjectLayout>{page}</ProjectLayout>
    </MainLayout>
  );
}
