import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LinkOutlined } from '@ant-design/icons';
import { Button, Col, Collapse, Row, Select, Space, Switch } from 'antd';
import moment from 'moment';

import { updateIssue } from 'core/actions';
import { useAppDispatch, useAppSelector } from 'core/hooks';
import { IssuesServices } from 'core/services';
import { EIssuePriority, EIssueStatus, EIssueType, TIssue } from 'core/types';

import Icon from 'components/Common/Icon';
import IssueComments from 'components/Issues/IssueComments';
import IssueDescription from 'components/Issues/IssueDescription';
import IssueFiles from 'components/Issues/IssueFiles';
import IssueInput from 'components/Issues/IssueInput';
import IssueLinks from 'components/Issues/IssueLinks';
import IssueName from 'components/Issues/IssueName';
import IssueSelectUser from 'components/Issues/IssueSelectUser';

import styles from './issue.module.scss';

const { Panel } = Collapse;

interface IProps {
  issueId: number;
  onCancel?: () => void;
}

const Issue = ({ issueId, onCancel }: IProps) => {
  const dispatch = useAppDispatch();
  const components = useAppSelector(state => state.components.list);
  const [issue, setIssue] = useState<TIssue | null>(null);

  const loadIssue = () => {
    IssuesServices.get({ id: issueId })
      .then(rs => setIssue(rs))
      .catch(error => console.log(error));
  };

  useEffect(loadIssue, [issueId]);

  const handleChange = (type: string, value: any) => {
    dispatch(updateIssue(issueId, type, typeof value === 'boolean' ? value : value || null));
  };

  if (!issue) return null;

  return (
    <Row className={styles.wrapper}>
      <Col span={14} className={styles.content}>
        {Boolean(onCancel) && (
          <div>
            <Icon custom={issue.type} />
            <Link href={`/projects/${issue.project.ticket}/issues/${issue.key}`}>
              <a target="_blank">{issue.key}</a>
            </Link>
            <Button type="link" shape="circle">
              <LinkOutlined />
            </Button>
          </div>
        )}
        <IssueName name={issue.name} onChange={value => handleChange('name', value)} />
        <IssueDescription description={issue.description} onChange={value => handleChange('description', value)} />
        <IssueFiles issueId={issue.id} />
        <IssueLinks issueId={issue.id} />
        <IssueComments issueId={issue.id} />
      </Col>
      <Col span={10} className={styles.info}>
        <Space>
          <Select
            defaultValue={issue.status}
            style={{ width: '120px' }}
            onChange={value => handleChange('status', value)}
          >
            {(Object.keys(EIssueStatus) as (keyof typeof EIssueStatus)[]).map(key => (
              <Select.Option key={key} value={EIssueStatus[key]}>
                {key}
              </Select.Option>
            ))}
          </Select>
          <Select defaultValue={issue.type} style={{ width: '120px' }} onChange={value => handleChange('type', value)}>
            {(Object.keys(EIssueType) as (keyof typeof EIssueType)[]).map(key => (
              <Select.Option key={key} value={EIssueType[key]}>
                {key}
              </Select.Option>
            ))}
          </Select>
        </Space>
        <br />
        <br />
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Details" key="1">
            <Row className={styles.item}>
              <Col span={12}>Assignee</Col>
              <Col span={12}>
                <IssueSelectUser user={issue.assignee || null} onChange={value => handleChange('assigneeId', value)} />
              </Col>
            </Row>
            <Row className={styles.item}>
              <Col span={12}>Priority</Col>
              <Col span={12}>
                <Select
                  defaultValue={issue.priority}
                  style={{ width: '160px' }}
                  onChange={value => handleChange('priority', value)}
                >
                  {(Object.keys(EIssuePriority) as (keyof typeof EIssuePriority)[]).map(key => (
                    <Select.Option key={key} value={EIssuePriority[key]}>
                      <Icon custom={EIssuePriority[key]} /> {key}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row className={styles.item}>
              <Col span={12}>Component</Col>
              <Col span={12}>
                <Select
                  defaultValue={issue?.component?.id}
                  allowClear
                  onChange={value => handleChange('componentId', value)}
                  style={{ width: '160px' }}
                >
                  {components.map(component => (
                    <Select.Option key={component.id} value={component.id}>
                      {component.name}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row className={styles.item}>
              <Col span={12}>Reporter</Col>
              <Col span={12}>
                <IssueSelectUser user={issue.reporter || null} onChange={value => handleChange('reporterId', value)} />
              </Col>
            </Row>
            <Row className={styles.item}>
              <Col span={12}>Is backlog</Col>
              <Col span={12}>
                <Switch
                  size="small"
                  defaultChecked={issue.isBacklog}
                  onChange={value => handleChange('isBacklog', value)}
                />
              </Col>
            </Row>
            <Row className={styles.item}>
              <Col span={12}>Estimate</Col>
              <Col span={12}>
                <IssueInput value={issue.estimate} onChange={value => handleChange('estimate', value)} />
              </Col>
            </Row>
            <Row className={styles.item}>
              <Col span={12}>Story points</Col>
              <Col span={12}>
                <IssueInput value={issue.storyPoints} onChange={value => handleChange('storyPoints', value)} />
              </Col>
            </Row>
          </Panel>
        </Collapse>
        <div className={styles.dates}>
          <div>
            Created {moment(issue.createdDate).fromNow()} - {moment(issue.createdDate).format('DD/MM/YYYY, h:mm')}
          </div>
          <div>
            Updated {moment(issue.updatedDate).fromNow()} - {moment(issue.updatedDate).format('DD/MM/YYYY, h:mm')}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Issue;
