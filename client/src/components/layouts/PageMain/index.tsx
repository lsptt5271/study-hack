import { ReactNode } from 'react';

type PageMainProps = {
  children: ReactNode;
};

export const PageMain = ({ children }: PageMainProps) => {
  return <main className={'flex-1'}>{children}</main>;
};
