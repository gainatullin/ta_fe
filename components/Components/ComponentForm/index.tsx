import React from 'react';
import { Button, Col, Form, Input, message, Row, Select } from 'antd';

import { loadComponents } from 'core/actions';
import { useAppDispatch, useAppSelector, useSubmit } from 'core/hooks';
import { ComponentServices } from 'core/services';
import { closeModal } from 'core/store';
import { TComponent } from 'core/types';

const { TextArea } = Input;

interface IProps {
  projectId?: number;
  component?: TComponent;
  onCancel?: () => void;
}

const ComponentForm: React.FC<IProps> = ({ projectId, component, onCancel }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { isSubmitting, submit, clearError } = useSubmit();
  const users = useAppSelector(state => state.users.list);

  const initialValues: {
    name: string;
    description: string;
    leadId: number | null;
  } = {
    name: component?.name || '',
    description: component?.description || '',
    leadId: component?.lead?.id || null,
  };

  const handleSuccess = (msg: string) => {
    dispatch(loadComponents());
    message.success(msg);
    onCancel && onCancel();
  };

  const handleSubmit = (values: any) => {
    console.log(values);
    if (component) {
      submit(ComponentServices.update, { ...values, id: component.id, leadId: values.leadId || null }, () =>
        handleSuccess('Updated'),
      );
    } else {
      submit(ComponentServices.create, { ...values, projectId }, () => handleSuccess('Created'));
    }
  };

  const closeCreateComponent = () => {
    dispatch(closeModal());
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
        <TextArea />
      </Form.Item>
      <Form.Item label="Lead" name="leadId">
        <Select allowClear>
          {users.map(user => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Row justify="space-between">
        <Col />
        <Col>
          <Button type="link" onClick={closeCreateComponent}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" disabled={isSubmitting}>
            {Boolean(component) ? 'Save' : 'Create'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ComponentForm;
