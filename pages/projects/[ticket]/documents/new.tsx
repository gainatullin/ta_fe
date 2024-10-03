import { useAppSelector } from 'core/hooks';
import { NextPageWithLayout } from 'core/types';

import DocumentForm from 'components/Documents/DocumentForm';
import { getProjectLayout } from 'components/Projects/ProjectLayout';

const NewDocument: NextPageWithLayout = () => {
  const project = useAppSelector(state => state.projects.current);

  if (!project) return null;

  return (
    <div>
      <DocumentForm project={project} />
    </div>
  );
};

NewDocument.getLayout = getProjectLayout;

export default NewDocument;
