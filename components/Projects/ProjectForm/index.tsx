import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Input, message, Row, Select } from 'antd';

import { loadProjects } from 'core/actions';
import { useAppDispatch, useAppSelector, useSubmit } from 'core/hooks';
import { ProjectsServices, WorkspacesServices } from 'core/services';
import { closeModal } from 'core/store';
import { TProject, TUser } from 'core/types';

const { TextArea } = Input;

interface IProps {
  project?: TProject;
  onCancel?: () => void;
}

const ProjectForm: React.FC<IProps> = ({ project = null, onCancel = undefined }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const workspaces = useAppSelector(state => state.workspaces.list);
  const [workspaceId, setWorkspaceId] = useState<number | null>(null);
  const [workspaceUsers, setWorkspaceUsers] = useState<TUser[]>([]);
  const { isSubmitting, submit, clearError } = useSubmit();

  const initialValues: {
    name: string;
    ticket: string;
    description: string;
    workspaceId: number | null;
    leadId: number | null;
  } = {
    name: project?.name || '',
    ticket: project?.ticket || '',
    description: project?.description || '',
    workspaceId: project?.workspace?.id || null,
    leadId: project?.lead?.id || null,
  };

  const loadWorkspaceUsers = useCallback(() => {
    WorkspacesServices.usersSearch({ id: workspaceId })
      .then(rs => setWorkspaceUsers(rs.list))
      .catch(error => console.log(error));
  }, [workspaceId]);

  useEffect(() => {
    if (!workspaceId && workspaces.length > 0) {
      form.setFieldsValue({ workspaceId: workspaces[0].id });
      setWorkspaceId(workspaces[0].id);
    }
  }, [workspaces, workspaceId, form]);

  useEffect(() => {
    if (project) setWorkspaceId(project.workspace.id);
  }, [project]);

  useEffect(() => {
    if (workspaceId) loadWorkspaceUsers();
  }, [workspaceId, loadWorkspaceUsers]);

  const handleOnSuccess = (msg: string) => {
    dispatch(loadProjects());
    message.success(msg);
    onCancel && onCancel();
  };

  const handleClickCancel = () => dispatch(closeModal());

  const handleOnFieldsChange = (changedValues: any) => {
    if (changedValues.length === 1 && changedValues[0].name[0] === 'workspaceId') {
      setWorkspaceId(changedValues[0].value);
    }
    clearError();
  };

  const handleSubmit = (values: any) => {
    if (project) {
      const data = { ...values, id: project.id, leadId: values.leadId || null };
      submit(ProjectsServices.update, data, () => handleOnSuccess('Updated'));
    } else {
      submit(ProjectsServices.create, values, () => handleOnSuccess('Created'));
    }
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      layout="vertical"
      onFieldsChange={handleOnFieldsChange}
    >
      {!Boolean(project) && (
        <Form.Item
          label="Workspace"
          name="workspaceId"
          rules={[{ required: true, message: 'Please select workspace' }]}
        >
          <Select>
            {workspaces.map(workspace => (
              <Select.Option key={workspace.id} value={workspace.id}>
                {workspace.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: 'Please input name' },
          { min: 3, message: 'Name must be minimum 3 characters.' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Ticket"
        name="ticket"
        rules={[
          { required: true, message: 'Please input ticked' },
          { min: 3, message: 'Name must be minimum 3 characters.' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <TextArea />
      </Form.Item>
      <Form.Item label="Lead" name="leadId">
        <Select
          allowClear
          disabled={workspaceUsers.length === 0}
          placeholder={workspaceUsers.length === 0 ? 'Please select workspace' : ''}
        >
          {workspaceUsers.map(user => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Row justify="space-between">
        <Col />
        <Col>
          <Button type="link" onClick={handleClickCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" disabled={isSubmitting}>
            {Boolean(project) ? 'Save' : 'Create'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ProjectForm;
