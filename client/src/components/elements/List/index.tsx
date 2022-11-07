import { ReactNode } from 'react';

type ListProps = {
  children: ReactNode;
};

export const List = ({ children }: ListProps) => {
  return <ul>{children}</ul>;
};
