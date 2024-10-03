import { useAppSelector } from 'core/hooks';
import { NextPageWithLayout } from 'core/types';

import DocumentForm from 'components/Documents/DocumentForm';
import { getProjectLayout } from 'components/Projects/ProjectLayout';

const EditDocument: NextPageWithLayout = () => {
  const project = useAppSelector(state => state.projects.current);

  if (!project) return null;

  return (
    <div>
      <DocumentForm project={project} />
    </div>
  );
};

EditDocument.getLayout = getProjectLayout;

export default EditDocument;
