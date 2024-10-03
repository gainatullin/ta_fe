import { FC } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Space } from 'antd';

import { loginSuccess } from 'core/actions';
import { emailRule, hash, inputNormalize, requiredRule } from 'core/helpers';
import { useAppDispatch, useSubmit } from 'core/hooks';
import { AuthenticationServices } from 'core/services';
import { TSignFormType } from 'core/types';

import styles from './signIn.module.scss';

interface IProps {
  onChangeForm: (type: TSignFormType) => void;
  onCancel: () => void;
}

type TFormValues = { email: string; password: string };

const SignInForm: FC<IProps> = ({ onChangeForm, onCancel }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { clearError, isSubmitting, submit, errorMessage } = useSubmit();

  const initialValues: TFormValues = { email: '', password: '' };

  const handleSubmit = (values: TFormValues): void => {
    submit(
      AuthenticationServices.signIn,
      { email: values.email, passwordHash: hash(values.password) },
      (response: string) => {
        dispatch(loginSuccess(response));
        onCancel();
      },
    );
  };

  return (
    <Form
      layout="vertical"
      name="signIn"
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      onFieldsChange={() => clearError()}
      requiredMark={false}
    >
      <Form.Item
        label="Email"
        name="email"
        normalize={inputNormalize}
        rules={[requiredRule('Enter email'), emailRule('Enter correct email')]}
      >
        <Input prefix={<MailOutlined />} size="large" maxLength={100} />
      </Form.Item>
      <Form.Item label="Password" name="password" normalize={inputNormalize} rules={[requiredRule('Enter password')]}>
        <Input.Password type="password" prefix={<LockOutlined />} size="large" maxLength={50} />
      </Form.Item>
      <Space className={styles.block}>
        <div className={styles.buttonsWrapper}>
          <Button style={{ marginRight: '10px' }} type="primary" htmlType="submit" disabled={isSubmitting}>
            Sign In
          </Button>
          <Button type="default" disabled={isSubmitting} onClick={onCancel}>
            Cancel
          </Button>
        </div>
        <div>
          <Button type="link" disabled={isSubmitting} onClick={() => onChangeForm('signup')}>
            Sign Up
          </Button>
          <Button type="link" disabled={isSubmitting} onClick={() => onChangeForm('recovery')}>
            Recovery
          </Button>
        </div>
      </Space>
      {Boolean(errorMessage) && <Alert type="error" message={errorMessage} />}
    </Form>
  );
};

export default SignInForm;
