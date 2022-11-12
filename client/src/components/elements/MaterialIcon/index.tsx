import { MouseEvent, useMemo } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

type MaterialIconProps = {
  children: string;
  className?: string;
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
};

export const MaterialIcon = ({ children, className = '', onClick }: MaterialIconProps) => {
  const dynamicClassName = useMemo(() => {
    return onClick ? 'cursor-pointer hover:text-secondary' : '';
  }, [onClick]);

  return (
    <span className={overrideTailwindClasses(`material-icons ${dynamicClassName} ${className} `)} onClick={onClick}>
      {children}
    </span>
  );
};
