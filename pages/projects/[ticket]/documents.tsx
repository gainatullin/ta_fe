import { useAppSelector } from 'core/hooks';
import { NextPageWithLayout } from 'core/types';

import DocumentForm from 'components/Documents/DocumentForm';
import { getProjectLayout } from 'components/Projects/ProjectLayout';

const Documents: NextPageWithLayout = () => {
  const project = useAppSelector(state => state.projects.current);

  if (!project) return null;

  return (
    <div>
      <h1>Documents</h1>
      <DocumentForm project={project} />
    </div>
  );
};

Documents.getLayout = getProjectLayout;

export default Documents;
