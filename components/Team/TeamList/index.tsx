import { Avatar, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';

import { getAvatarSrc } from 'core/helpers';
import { useAppSelector } from 'core/hooks';
import { ERole, TInvitation, TUser } from 'core/types';

import styles from './teamList.module.scss';

const TeamList = () => {
  const users = useAppSelector(state => state.users.list);
  const invitations = useAppSelector(state => state.invitations.list);

  const UsersTableColumns: ColumnsType<TUser> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        return (
          <Space>
            <Avatar src={getAvatarSrc('users', record.id)} />
            <span>{record.name}</span>
          </Space>
        );
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      // @ts-ignore
      render: (_, record) => `${ERole[record.role]}`,
    },
  ];

  const InvitesTableColumns: ColumnsType<TInvitation> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Created',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (_, { createdDate }) =>
        `${moment(createdDate).fromNow()} - ${moment(createdDate).format('DD/MM/YYYY, h:mm')}`,
    },
  ];

  return (
    <div>
      <h3 className={styles.tableName}>Project users</h3>
      <Table columns={UsersTableColumns} dataSource={users} pagination={false} rowKey={record => record.id} />
      <h3 className={styles.tableName}>Invites</h3>
      <Table columns={InvitesTableColumns} dataSource={invitations} pagination={false} rowKey={record => record.id} />
    </div>
  );
};

export default TeamList;
