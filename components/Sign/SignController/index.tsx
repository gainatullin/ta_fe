import React, { useEffect, useState } from 'react';

import { useAppSelector } from 'core/hooks';
import { InvitationsServices } from 'core/services';
import { TSignFormType } from 'core/types';

import SignInForm from 'components/Sign/SignIn';
import SignInvitation from 'components/Sign/SignInvitation';
import SignRecoveryForm from 'components/Sign/SignRecovery';
import SignUpForm from 'components/Sign/SignUp';

interface IProps {
  onCancel: () => void;
}

const SignController = ({ onCancel }: IProps) => {
  const [formType, setFormType] = useState<TSignFormType>('signin');
  const data = useAppSelector(state => state.modal.data);
  const [inviteData, setInviteData] = useState<any>(null);

  useEffect(() => {
    if (data?.values?.i && data?.values?.c) {
      InvitationsServices.get({ id: data?.values?.i })
        .then(rs => {
          setInviteData(rs);
          setFormType('invitation');
        })
        .catch(error => console.log(error));
    }
  }, [data]);

  const handleChaneFormType = (type: TSignFormType) => setFormType(type);

  return (
    <>
      {formType === 'signin' && <SignInForm onChangeForm={handleChaneFormType} onCancel={onCancel} />}
      {formType === 'signup' && <SignUpForm onChangeForm={handleChaneFormType} onCancel={onCancel} />}
      {formType === 'recovery' && <SignRecoveryForm onChangeForm={handleChaneFormType} onCancel={onCancel} />}
      {formType === 'invitation' && Boolean(inviteData) && (
        <SignInvitation
          inviteData={inviteData}
          confirmationCode={data?.values?.c}
          onChangeForm={handleChaneFormType}
          onCancel={onCancel}
        />
      )}
    </>
  );
};

export default SignController;
