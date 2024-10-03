import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { useAppSelector } from 'core/hooks';
import { NextPageWithLayout } from 'core/types';

import Issue from 'components/Issues/Issue';
import IssueBreadcrumbs from 'components/Issues/IssueBreadcrumbs';
import { getProjectLayout } from 'components/Projects/ProjectLayout';

const IssuePage: NextPageWithLayout = () => {
  const router = useRouter();
  const key = router.query?.key as string;
  const issues = useAppSelector(state => state.issues.list);

  const issue = useMemo(() => {
    if (key && issues.length > 0) {
      return issues.find(item => item.key.toUpperCase() === key.toUpperCase());
    }
    return null;
  }, [key, issues]);

  if (!issue) return null;

  return (
    <>
      <header>
        <IssueBreadcrumbs issue={issue} />
      </header>
      <main>
        <Issue issueId={issue.id} />
      </main>
    </>
  );
};

IssuePage.getLayout = getProjectLayout;

export default IssuePage;
