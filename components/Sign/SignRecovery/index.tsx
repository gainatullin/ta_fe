import React, { FC, useState } from 'react';
//import { emailRule, inputNormalize, requiredRule, confirmationCodeRule, passwordRule, hash } from 'core/helpers';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Space } from 'antd';

import { useSubmit } from 'core/hooks';
import { TSignFormType } from 'core/types';

//import { CredentialsServices } from 'core/services/credentials';
//import { errors } from 'core/constants/errors';
import styles from './signRecovery.module.scss';

interface IProps {
  onChangeForm: (type: TSignFormType) => void;
  onCancel: () => void;
}

type TFormValues = { username: string; code: string };
type TPasswordChangeFormValues = { password: string; repeatPassword: string; recoveryCode: string };

const SignRecoveryForm: FC<IProps> = ({ onChangeForm, onCancel }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState('');
  const [credentialID, setCredentialID] = useState(0);
  const [userName, setUserName] = useState('');
  const [passwordsEquality, setPasswordsEquality] = useState(true);
  const [form] = Form.useForm();
  const initialValues: TFormValues = { username: '', code: '' };
  const initialPasswordValues: TPasswordChangeFormValues = {
    recoveryCode: '',
    password: '',
    repeatPassword: '',
  };

  const { clearError, isSubmitting, submit, errorCode, errorMessage } = useSubmit();

  const handleSubmit = (values: TFormValues): void => {
    /*    submit(CredentialsServices.recovery, { value: values.username }, credentialID =>
      onFinishSubmitting(values, credentialID),
    );*/
  };

  const onConfirmSuccess = (): void => {
    message.info('Password changed');
    onCancel();
  };

  const onFinishSubmitting = (values: TFormValues, credentialID: number): void => {
    setIsSuccess(true);
    setUserName(values.username);
    setCredentialID(credentialID);
  };

  const handleSubmitPasswordChange = (values: TPasswordChangeFormValues): void => {
    // @ts-ignore
    if (values.password === values.repeatPassword) {
      /*      setPasswordsEquality(true);
      submit(
        CredentialsServices.confirm,
        {
          confirmationCode: values.recoveryCode,
          credentialID,
          passwordHash: hash(values.password),
        },
        () => onConfirmSuccess(),
      );*/
    } else {
      setPasswordsEquality(false);
    }
  };

  if (isSuccess) {
    return (
      <Form
        layout="vertical"
        name="confirmPassword"
        form={form}
        initialValues={initialPasswordValues}
        onFinish={handleSubmitPasswordChange}
        onFieldsChange={clearError}
        autoComplete={'off'}
        requiredMark={false}
      >
        <p>We've sent you a recovery code to {userName}.</p>
        <p>Please, enter the code below to set a new password.</p>
        <Form.Item label="Enter recovery code" name="recoveryCode">
          <Input
            value={recoveryCode}
            onChange={({ target: { value } }) => setRecoveryCode(value)}
            maxLength={6}
            size="large"
            autoComplete="off"
            type={'text'}
            suffix=" "
          />
        </Form.Item>
        <Form.Item label="New password" name="password">
          <Input.Password
            type="password"
            size="large"
            maxLength={50}
            prefix={<LockOutlined />}
            autoComplete={'new-password'}
          />
        </Form.Item>
        <Form.Item label="Repeat new password" name="repeatPassword">
          <Input.Password type="password" size="large" maxLength={50} prefix={<LockOutlined />} autoComplete="off" />
        </Form.Item>
        <Space style={{ paddingTop: '15px' }}>
          <Button type="primary" htmlType="submit" disabled={isSubmitting}>
            Confirm
          </Button>
          <Button type="default" disabled={isSubmitting} onClick={onCancel}>
            Cancel
          </Button>
        </Space>
        {!passwordsEquality ? <div className="error_message">Passwords are not equal</div> : null}
      </Form>
    );
  }

  return (
    <Form
      layout="vertical"
      name="recovery"
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      onFieldsChange={clearError}
      requiredMark={false}
    >
      <Form.Item
        // label={<AuthValueLabel value={authValueType} onChange={type => setAuthValueType(type)} />}
        label="Email"
        name="username"
      >
        <Input size="large" maxLength={100} prefix={<MailOutlined />} />
      </Form.Item>
      <div className={styles.block}>
        <Button className={`${styles.btn} btn-rounded-black`} type="primary" htmlType="submit" disabled={isSubmitting}>
          Continue
        </Button>
        <Button
          className={`${styles.btn} btn-rounded-white-black-border`}
          type="default"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="link" onClick={() => onChangeForm('signin')}>
          Sign In
        </Button>
      </div>
      {errorCode ? (
        <>
          {errorCode === 'NOT_EXIST_CREDENTIAL' ? (
            <div className="error_message">{errorMessage}</div>
          ) : (
            <div className="error_message">{errorCode}</div>
          )}
        </>
      ) : null}
    </Form>
  );
};

export default SignRecoveryForm;
