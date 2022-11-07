import { ReactNode } from 'react';

type FormField = {
  children: ReactNode;
};

export const FormField = ({ children }: FormField) => {
  return <div className={'mb-2 last:mb-0'}>{children}</div>;
};
