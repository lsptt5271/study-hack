import { ReactNode } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

type ListProps = {
  children: ReactNode;
  className?: string;
};

export const List = ({ children, className = '' }: ListProps) => {
  return <ul className={overrideTailwindClasses(`overflow-y-auto ${className}`)}>{children}</ul>;
};
