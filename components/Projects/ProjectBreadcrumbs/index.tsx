import Link from 'next/link';
import { Space } from 'antd';

import { useAppSelector } from 'core/hooks';

const ProjectBreadcrumbs = () => {
  const project = useAppSelector(state => state.projects.current);
  return (
    <Space>
      <Link href={`/projects`}>
        <a>Projects</a>
      </Link>
      <span>/</span>
      <Link href={`/projects/${project?.ticket}`}>
        <a>{project?.name}</a>
      </Link>
    </Space>
  );
};

export default ProjectBreadcrumbs;
