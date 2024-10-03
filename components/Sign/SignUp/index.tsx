import { FC } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Space } from 'antd';

import { loginSuccess } from 'core/actions';
import { hash, inputNormalize, requiredRule } from 'core/helpers';
import { useAppDispatch, useSubmit } from 'core/hooks';
import { UsersServices } from 'core/services';
import { TSignFormType } from 'core/types';

interface IProps {
  onChangeForm: (type: TSignFormType) => void;
  onCancel: () => void;
}

type TFormValues = { name: string; email: string; password: string; confirmationCode: '' };

const SignUpForm: FC<IProps> = ({ onChangeForm, onCancel }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { clearError, isSubmitting, submit, errorMessage } = useSubmit();

  const initialValues: TFormValues = { name: '', email: '', password: '', confirmationCode: '' };

  const handleSubmit = async (values: TFormValues) => {
    const passwordHash = hash(values.password);
    submit(UsersServices.signUp, { name: values.name, email: values.email, passwordHash }, (response: string) => {
      console.log(response);
      dispatch(loginSuccess(response));
      onCancel();
    });
  };

  return (
    <Form
      layout="vertical"
      name="signUp"
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      onFieldsChange={clearError}
      requiredMark={false}
    >
      <Form.Item label="Name" name="name" normalize={inputNormalize} rules={[requiredRule('Enter your Name')]}>
        <Input size="large" maxLength={100} />
      </Form.Item>
      <Form.Item label="Email" name="email" normalize={inputNormalize} rules={[requiredRule('Enter your email')]}>
        <Input size="large" maxLength={100} prefix={<MailOutlined />} />
      </Form.Item>
      <Form.Item label="Password" name="password" normalize={inputNormalize} rules={[requiredRule('Enter password')]}>
        <Input.Password type="password" size="large" maxLength={50} prefix={<LockOutlined />} />
      </Form.Item>
      <Space style={{ paddingTop: '15px' }}>
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          Sign Up
        </Button>
        <Button type="default" disabled={isSubmitting} onClick={onCancel}>
          Cancel
        </Button>
        <Button type="link" disabled={isSubmitting} onClick={() => onChangeForm('signin')}>
          Sign In
        </Button>
      </Space>
      {errorMessage ? <Alert type="error" message={errorMessage} /> : null}
    </Form>
  );
};

export default SignUpForm;
