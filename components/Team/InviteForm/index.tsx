import React from 'react';
import { Button, Col, Form, Input, message, Row, Select } from 'antd';

import { emailRule, requiredRule } from 'core/helpers';
import { useAppDispatch, useAppSelector, useSubmit } from 'core/hooks';
import { InvitationsServices } from 'core/services';
import { closeModal } from 'core/store';

import styles from './invuteForm.module.scss';

const { Option } = Select;

interface IProps {
  onCancel: () => void;
}

const InviteForm: React.FC<IProps> = ({ onCancel }) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(state => state.projects.current);
  const [form] = Form.useForm();
  const { isSubmitting, submit, clearError } = useSubmit();

  const initialValues = {
    name: '',
    email: '',
    role: 'WORKER',
  };

  const handleSubmit = (values: any) => {
    const data = { ...values, workspaceId: project?.workspace.id, projectId: project?.id };
    submit(InvitationsServices.create, data, () => {
      dispatch(closeModal());
      message.success('Invitation is sent');
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
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please input Shortcut name' },
            { min: 3, message: 'Shortcut name must be minimum 3 characters.' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="E-mail" name="email" rules={[requiredRule('Enter email'), emailRule('Enter correct email')]}>
          <Input />
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
            Invite
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default InviteForm;
