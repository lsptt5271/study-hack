import { ReactNode } from 'react';

type PageMainProps = {
  children: ReactNode;
};

export const PageMain = ({ children }: PageMainProps) => {
  return <main className={'h-[calc(100%_-_var(--size-header-height))]'}>{children}</main>;
};
