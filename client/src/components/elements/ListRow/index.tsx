import { ReactNode, useMemo } from 'react';

type ListRowProps = {
  children: ReactNode;
  selected?: boolean;
};

export const ListRow = ({ children, selected = false }: ListRowProps) => {
  const dynamicClassName = useMemo(() => {
    return selected ? 'bg-secondary' : '';
  }, [selected]);

  return <li className={`flexible h-[40px] border-b border-[#bcbcbc] ${dynamicClassName}`}>{children}</li>;
};
