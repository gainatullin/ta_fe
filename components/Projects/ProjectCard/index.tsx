import Link from 'next/link';
import { Avatar } from 'antd';

import { TProject } from 'core/types';

import styles from './projectCard.module.scss';

interface IProps {
  project: TProject;
}

const ProjectCard = ({ project }: IProps) => {
  return (
    <div className={styles.container}>
      <Link href={`/projects/${project.ticket}`}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            <Avatar src={project.avatarSrc} />
          </div>
          <div>
            <div className={styles.name}>{project.name}</div>
            <div className={styles.description}>{project.description}</div>
          </div>
        </div>
      </Link>
      <div className={styles.body}>
        <Link href={`/projects/${project.ticket}`}>
          <a>Board</a>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
