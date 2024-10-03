import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, message, Row, Select } from 'antd';

import { useAppDispatch, useAppSelector, useSubmit } from 'core/hooks';
import { ProjectsServices, WorkspacesServices } from 'core/services';
import { closeModal } from 'core/store';
import { TUser } from 'core/types';

import styles from './addPeopleForm.module.scss';

const { Option } = Select;

interface IProps {
  onCancel: () => void;
}

const AddPeopleForm: React.FC<IProps> = ({ onCancel }) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(state => state.projects.current);
  const [form] = Form.useForm();
  const { isSubmitting, submit, clearError } = useSubmit();
  const [workspaceUsers, setWorkspaceUsers] = useState<TUser[]>([]);

  const loadWorkspaceUsers = useCallback(() => {
    WorkspacesServices.usersSearch({ id: project?.workspace.id })
      .then(rs => setWorkspaceUsers(rs))
      .catch(error => console.log(error));
  }, [project?.workspace.id]);

  useEffect(() => {
    if (project?.workspace.id) loadWorkspaceUsers();
  }, [project?.workspace.id, loadWorkspaceUsers]);

  console.log('workspaceUsers', workspaceUsers);

  const initialValues = {
    role: 'WORKER',
  };

  const handleSubmit = (values: any) => {
    const data = { id: project?.id, role: values.role, userId: values.user };
    submit(ProjectsServices.userAdd, data, () => {
      dispatch(closeModal());
      message.success('User was added');
    });
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      layout="vertical"
      onFieldsChange={clearError}
    >
      <div className={styles.formContent}>
        <Form.Item name="user" label="Select user">
          <Select>
            {workspaceUsers.map(user => (
              <Option value={user.id} key={user.id}>
                {user.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="role" label="Role">
          <Select>
            <Option value="WORKER">Worker</Option>
            <Option value="ADMIN">Administrator</Option>
            <Option value="VIEWER">Viewer</Option>
          </Select>
        </Form.Item>
      </div>
      <Row justify="space-between">
        <Col />
        <Col>
          <Button type="link" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" disabled={isSubmitting}>
            Add people
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddPeopleForm;
