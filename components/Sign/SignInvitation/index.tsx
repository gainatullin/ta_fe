import { FC } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

import { loginSuccess } from 'core/actions';
import { hash, inputNormalize, requiredRule } from 'core/helpers';
import { useAppDispatch, useSubmit } from 'core/hooks';
import { InvitationsServices } from 'core/services';
import { TSignFormType } from 'core/types';

interface IProps {
  onChangeForm: (type: TSignFormType) => void;
  onCancel: () => void;
  inviteData: any;
  confirmationCode: string;
}

type TFormValues = { name: string; value: string; password: string; confirmationCode: '' };

const SignInvitation: FC<IProps> = ({ onCancel, inviteData, confirmationCode }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { clearError, isSubmitting, submit, errorCode } = useSubmit();

  const initialValues: TFormValues = {
    name: inviteData?.name || '',
    value: inviteData?.email || '',
    password: '',
    confirmationCode: '',
  };

  const handleSubmit = async (values: TFormValues) => {
    const passwordHash = hash(values.password);
    submit(InvitationsServices.confirm, { id: inviteData.id, passwordHash, confirmationCode }, (response: string) => {
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
      <Form.Item label="Name" name="name">
        <Input size="large" disabled />
      </Form.Item>
      <Form.Item label="Email" name="value">
        <Input size="large" prefix={<MailOutlined />} disabled />
      </Form.Item>
      <Form.Item label="Password" name="password" normalize={inputNormalize} rules={[requiredRule('Enter password')]}>
        <Input.Password type="password" size="large" maxLength={50} prefix={<LockOutlined />} />
      </Form.Item>
      <Space style={{ paddingTop: '15px' }}>
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          Confirm
        </Button>
        <Button type="default" disabled={isSubmitting} onClick={onCancel}>
          Cancel
        </Button>
      </Space>
      {errorCode ? <div className="error_message">{`errors:${errorCode}`}</div> : null}
    </Form>
  );
};

export default SignInvitation;
