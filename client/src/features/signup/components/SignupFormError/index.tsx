import { ReactNode } from 'react';

type SignupFormErrorProps = {
  children: ReactNode;
};

export const SignupFormError = ({ children }: SignupFormErrorProps) => {
  return <p className={'pt-1 pl-1 text-red-500'}>{children}</p>;
};
