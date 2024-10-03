import { useEffect } from 'react';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { loadComponents } from 'core/actions';
import { useAppDispatch, useAppSelector } from 'core/hooks';
import { openModal } from 'core/store/modal';
import { TComponent } from 'core/types/project';

const ComponentsList = () => {
  const dispatch = useAppDispatch();
  const components = useAppSelector(state => state.components.list);

  useEffect(() => {
    dispatch(loadComponents());
  }, [dispatch]);

  const handleClickEdit = (component: TComponent) => {
    dispatch(openModal({ name: 'Edit component', type: 'editComponent', values: { component } }));
  };

  const ComponentsTableColumns: ColumnsType<TComponent> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Lead',
      dataIndex: 'lead',
      key: 'lead',
      render: (_, { lead }) => `${lead?.name || ''}`,
    },
    {
      title: 'Issues',
      dataIndex: 'issuesCount',
      key: 'issuesCount',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleClickEdit(record)}>
            Edit
          </Button>
          <Button type="link">Delete</Button>
        </Space>
      ),
    },
  ];

  if (!components) return null;

  return (
    <Table columns={ComponentsTableColumns} dataSource={components} pagination={false} rowKey={record => record.id} />
  );
};

export default ComponentsList;
