import { Avatar, Col, Row, Tooltip } from 'antd';

import { getAvatarSrc } from 'core/helpers';
import { TIssue } from 'core/types';

import Icon from 'components/Common/Icon';

import styles from './issueBoardCard.module.scss';

interface IProps {
  issue: TIssue;
  onClick: (issueId: number) => void;
}

const IssueBoardCard = ({ issue, onClick }: IProps) => {
  return (
    <div className={styles.issueCard} onClick={() => onClick(issue.id)}>
      <div className={styles.issueCard_title}>{issue.name}</div>
      {issue.component && <div className={styles.issueCard_component}>{issue.component.name}</div>}
      <Row className={styles.issueCard_footer} justify="space-between">
        <Col>
          <Icon custom={issue.priority} />
          <Icon custom={issue.type} />
        </Col>
        <Col>
          <span className={styles.issueCard_ticker}>{issue.key}</span>
          {issue?.assignee && (
            <Tooltip title={`Assignee: ${issue.assignee.name}`}>
              <Avatar size="small" src={getAvatarSrc('users', issue.assignee.id)} />
            </Tooltip>
          )}
        </Col>
      </Row>
    </div>
  );
};
export default IssueBoardCard;
