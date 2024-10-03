import React from 'react';
import { Alert, Button, Form, Input, message } from 'antd';

import { loadWorkspaces } from 'core/actions';
import { useAppDispatch, useSubmit } from 'core/hooks';
import { WorkspacesServices } from 'core/services';
import { TWorkspace } from 'core/types';

interface IProps {
  workspace?: TWorkspace;
  onCancel: () => void;
}

const WorkspaceForm: React.FC<IProps> = ({ workspace = null, onCancel }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { clearError, isSubmitting, submit, errorMessage } = useSubmit();

  const initialValues = {
    name: '',
    description: '',
  };

  const handleSubmit = (values: any) => {
    submit(WorkspacesServices.create, values, () => {
      dispatch(loadWorkspaces());
      message.success('Workspace created');
      onCancel();
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
      <Form.Item name="description" label="Description">
        <Input.TextArea />
      </Form.Item>
      <div>
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          Create
        </Button>
      </div>
      {Boolean(errorMessage) && <Alert type="error" message={errorMessage} />}
    </Form>
  );
};

export default WorkspaceForm;
