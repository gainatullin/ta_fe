import Link from 'next/link';
import { Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { useAppSelector } from 'core/hooks';
import { ELoadingStatus, TProject } from 'core/types';

const ProjectsTableColumns: ColumnsType<TProject> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, { ticket, name }) => <Link href={`/projects/${ticket}`}>{name}</Link>,
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Ticket',
    dataIndex: 'ticket',
    key: 'ticket',
  },
  {
    title: 'Workspace',
    dataIndex: 'workspace',
    key: 'workspace',
    render: (_, { workspace }) => workspace.name,
    sorter: (a, b) => a.workspace.name.length - b.workspace.name.length,
  },
  {
    title: 'Lead',
    dataIndex: 'lead',
    key: 'lead',
    render: (_, { lead }) => `${lead?.name || ''}`,
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, { ticket }) => (
      <Space>
        <Link href={`/projects/${ticket}`}>Board</Link>
        <Link href={`/projects/${ticket}/details`}>Details</Link>
        <Link href={`/projects/${ticket}/team`}>Team</Link>
      </Space>
    ),
  },
];

const ProjectsList = () => {
  const { loadingStatus, list } = useAppSelector(state => state.projects);

  return (
    <Table
      loading={loadingStatus !== ELoadingStatus.SUCCESS}
      columns={ProjectsTableColumns}
      dataSource={list}
      pagination={false}
      rowKey={record => record.ticket}
    />
  );
};

export default ProjectsList;
