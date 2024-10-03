import { useState } from 'react';

type TUseSubmit = {
  isSubmitting: boolean;
  submit: (
    service: any,
    data: any,
    success?: ((result: any) => void) | undefined,
    failure?: ((result: any) => void) | undefined,
  ) => void;
  errorCode: string;
  errorMessage: string;
  clearError: () => void;
};

export const useSubmit = (): TUseSubmit => {
  const [errorCode, setErrorCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = (service: any, data: any, success?: (result: any) => void, failure?: (result: any) => void) => {
    setIsSubmitting(true);

    service(data)
      .then((result: any) => {
        if (success) success(result);
      })
      .catch(({ code, message }: any) => {
        setErrorCode(code);
        setErrorMessage(message);
        if (failure) failure(code);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const clearError = (): void => {
    setErrorCode('');
    setErrorMessage('');
  };

  return {
    isSubmitting,
    submit,
    errorCode,
    errorMessage,
    clearError,
  };
};
