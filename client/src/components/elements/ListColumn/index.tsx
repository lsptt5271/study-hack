import { ReactNode, useMemo } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

type ListColumnProps = {
  children: ReactNode;
  position?: 'left' | 'center' | 'right';
  className?: string;
};

export const ListColumn = ({ children, position = 'left', className = '' }: ListColumnProps) => {
  const dynamicClassName = useMemo(() => {
    const classNames: string[] = [];
    switch (position) {
      case 'left':
        classNames.push('justify-start');
        break;
      case 'center':
        classNames.push('justify-center');
        break;
      case 'right':
        classNames.push('justify-end');
    }
    return classNames.join(' ');
  }, [position]);

  return <div className={overrideTailwindClasses(`flex items-center ${dynamicClassName} ${className}`)}>{children}</div>;
};
