import { Avatar, Button, List, Space, Tooltip } from 'antd';

import { getAvatarSrc } from 'core/helpers';
import { TIssue } from 'core/types';

import Icon from 'components/Common/Icon';

interface IProps {
  issues: TIssue[];
  onIssueCreate?: () => void;
  onIssueClick: (issue: TIssue) => void;
  isLoading: boolean;
}

const IssueList = ({ issues, onIssueCreate, onIssueClick, isLoading }: IProps) => {
  return (
    <List
      header={onIssueCreate ? <div>{`${issues.length} issues`}</div> : null}
      footer={
        onIssueCreate ? (
          <div>
            <Button size="small" type="link" onClick={onIssueCreate}>
              + Create issue
            </Button>
          </div>
        ) : (
          false
        )
      }
      dataSource={issues}
      renderItem={issue => (
        <List.Item onClick={() => onIssueClick(issue)} style={{ cursor: 'pointer' }}>
          <Space>
            <Icon custom={issue.type} />
            <span>{issue.key}</span>
            <span>{issue.name}</span>
          </Space>
          <Space>
            <Icon custom={issue.priority} />
            <span>{issue?.status.toUpperCase()}</span>
            {issue?.assignee && (
              <Tooltip placement="left" title={`Assignee: ${issue.assignee.name}`}>
                <Avatar size="small" src={getAvatarSrc('users', issue.assignee.id)} />
              </Tooltip>
            )}
          </Space>
        </List.Item>
      )}
      loading={isLoading}
    />
  );
};

export default IssueList;
