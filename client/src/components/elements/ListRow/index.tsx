import { ReactNode } from 'react';

type ListRowProps = {
  children: ReactNode;
};

export const ListRow = ({ children }: ListRowProps) => {
  return <li className={'flexible h-[40px] border-b border-[#bcbcbc]'}>{children}</li>;
};
