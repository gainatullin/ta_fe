import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';

import { getSelf } from 'core/actions';
import { hash } from 'core/helpers';
import { useAppSelector, useSubmit } from 'core/hooks';
import { UsersServices } from 'core/services';
import { store } from 'core/store';
import { EGetSelfType } from 'core/types';

const ProfileForm: React.FC = () => {
  const { user } = useAppSelector(state => state.session);
  const [form] = Form.useForm();
  const { isSubmitting, submit, clearError } = useSubmit();

  const initialValues = {
    name: user?.name || '',
    email: user?.email || '',
  };

  const onSubmit = (values: any): void => {
    const passwordHash = hash(values.password);
    let updateData = { name: values.name, email: values.email };
    if (values.password) {
      // @ts-ignore
      updateData = { name: values.name, email: values.email, passwordHash };
    }
    if (values.password && !values.confirm) {
      message.error('Please confirm your password!');
    } else {
      submit(UsersServices.update, updateData, () => {
        store.dispatch(getSelf(EGetSelfType.UPDATE));
        message.info('The data was changed successfully');
      });
    }
  };

  return (
    <Form form={form} initialValues={initialValues} onFinish={onSubmit} layout="vertical" onFieldsChange={clearError}>
      <div>
        <Form.Item
          label="Your name"
          name="name"
          rules={[
            { required: true, message: 'Please input name' },
            { min: 1, message: 'Name must be minimum 1 characters.' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Your E-mail"
          name="email"
          rules={[
            { required: true, message: 'Please input name' },
            { min: 1, message: 'Name must be minimum 1 characters.' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="New password"
          rules={[
            {
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm new password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" size="large" disabled={isSubmitting}>
          {isSubmitting && <LoadingOutlined />}
          Save
        </Button>
      </div>
    </Form>
  );
};

export default ProfileForm;
