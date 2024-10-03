import { useAppDispatch, useAppSelector } from 'core/hooks';
import { issuesSelector, openModal } from 'core/store';
import { TIssue } from 'core/types';

import IssueList from 'components/Issues/IssueList';

const BackLogList = () => {
  const dispatch = useAppDispatch();
  const issues = useAppSelector(state => issuesSelector(state, { isBacklog: true }));

  const handleClickIssue = (issue: TIssue) => {
    dispatch(openModal({ type: 'editIssue', values: { issueId: issue.id } }));
  };

  const handleCreateIssue = () => {
    dispatch(openModal({ name: 'Create issue', type: 'createIssue' }));
  };

  return (
    <IssueList issues={issues} onIssueCreate={handleCreateIssue} onIssueClick={handleClickIssue} isLoading={false} />
  );
};

export default BackLogList;
