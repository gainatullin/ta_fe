import { IssuesServices } from 'core/services';
import { setFilters, setIssue, setIssues, TAppDispatch, TGetState } from 'core/store';
import { TFilters } from 'core/types';

export const loadIssues = () => async (dispatch: TAppDispatch, getState: TGetState) => {
  const projectId = getState().projects?.current?.id;
  const issues = await IssuesServices.search({ projectId })
    .then(rs => rs.list)
    .catch(() => []);
  dispatch(setIssues(issues));
};

export const updateIssue =
  (issueId: number, type: string, value: any) => (dispatch: TAppDispatch, getState: TGetState) => {
    const data = { id: issueId, [type]: value };
    if (type === 'status') {
      const issues = getState().issues.list;
      const issue = issues.find(item => item.id === issueId);
      // @ts-ignore
      dispatch(setIssue({ ...issue, status: value }));
    }
    IssuesServices.update(data)
      .then(updatedIssue => {
        dispatch(setIssue(updatedIssue));
      })
      .catch(error => console.log(error));
  };

export const updateFilters = (filters: TFilters) => (dispatch: TAppDispatch) => {
  dispatch(setFilters(filters));
};
