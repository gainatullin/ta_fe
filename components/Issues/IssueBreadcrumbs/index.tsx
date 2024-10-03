import Link from 'next/link';
import { LinkOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';

import { TIssue } from 'core/types';

import Icon from 'components/Common/Icon';

const IssueBreadcrumbs = ({ issue }: { issue: TIssue }) => {
  return (
    <Space>
      <Link href={`/projects`}>
        <a>Projects</a>
      </Link>
      <span>/</span>
      <Link href={`/projects/${issue.project.ticket}`}>
        <a>{issue.project.name}</a>
      </Link>
      <span>/</span>
      <div>
        <Icon custom={issue.type} />
        <Link href={`/projects/${issue.project.ticket}/issues/${issue.key}`}>
          <a target="_blank">{issue.key}</a>
        </Link>
        <Button type="link" shape="circle">
          <LinkOutlined />
        </Button>
      </div>
    </Space>
  );
};

export default IssueBreadcrumbs;
