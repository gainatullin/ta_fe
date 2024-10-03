import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useAppSelector } from 'core/hooks';
import { IssuesServices } from 'core/services';
import { TIssue } from 'core/types';

import IssueList from 'components/Issues/IssueList';

const WidgetAssignee = () => {
  const router = useRouter();
  const user = useAppSelector(state => state.session.user);
  const [issues, setIssues] = useState<TIssue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      IssuesServices.search({ assigneeId: [user.id] })
        .then(response => setIssues(response.list))
        .catch(error => console.error(error))
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  const handleClickIssue = (issue: TIssue) => {
    router.push(`/projects/${issue.project.ticket}/issues/${issue.key}`);
  };

  return <IssueList issues={issues} onIssueClick={handleClickIssue} isLoading={isLoading} />;
};

export default WidgetAssignee;
