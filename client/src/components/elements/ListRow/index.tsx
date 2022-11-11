import { MouseEvent, ReactNode, useMemo } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

type ListRowProps = {
  children: ReactNode;
  className?: string;
  selected?: boolean;
  onClick?: (e: MouseEvent<HTMLLIElement>) => void;
};

export const ListRow = ({
  children,
  className = '',
  selected = false,
  onClick = () => {
    return;
  },
}: ListRowProps) => {
  const dynamicClassName = useMemo(() => {
    return selected ? 'bg-secondary' : '';
  }, [selected]);

  return (
    <li onClick={onClick} className={overrideTailwindClasses(`flexible h-[40px] border-b border-[#bcbcbc] ${dynamicClassName} ${className}`)}>
      {children}
    </li>
  );
};
