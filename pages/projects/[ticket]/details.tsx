import { useAppSelector } from 'core/hooks';
import { NextPageWithLayout } from 'core/types';

import ProjectAvatarForm from 'components/Projects/ProjectAvatarForm';
import ProjectForm from 'components/Projects/ProjectForm';
import { getProjectLayout } from 'components/Projects/ProjectLayout';

const Details: NextPageWithLayout = () => {
  const project = useAppSelector(state => state.projects.current);

  if (!project) return null;

  return (
    <div>
      <h1>Details</h1>
      <ProjectAvatarForm project={project} />
      <ProjectForm project={project} />
    </div>
  );
};

Details.getLayout = getProjectLayout;

export default Details;
