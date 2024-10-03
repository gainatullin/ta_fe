import { useRouter } from 'next/router';

import { NextPageWithLayout } from 'core/types';

import DocumentView from 'components/Documents/DocumentView';
import { getProjectLayout } from 'components/Projects/ProjectLayout';

const DocumentPage: NextPageWithLayout = () => {
  const router = useRouter();
  const id = router.query?.id as string;

  return (
    <>
      <main>
        <DocumentView id={id} />
      </main>
    </>
  );
};

DocumentPage.getLayout = getProjectLayout;

export default DocumentPage;
