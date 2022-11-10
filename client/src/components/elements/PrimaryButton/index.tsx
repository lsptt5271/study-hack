import { MouseEvent, ReactNode, useMemo } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

type PrimaryButtonProps = {
  size?: 'thin' | 'normal' | 'thick';
  className?: string;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const PrimaryButton = ({
  size = 'normal',
  className,
  children,
  onClick = () => {
    return;
  },
}: PrimaryButtonProps) => {
  const dynamicClassName = useMemo(() => {
    switch (size) {
      case 'thin':
        return 'p-1';
      case 'normal':
        return 'p-2';
      case 'thick':
        return 'p-4';
    }
  }, [size]);

  return (
    <button className={overrideTailwindClasses(`rounded border border-primary bg-secondary text-white ${dynamicClassName} ${className}`)} onClick={onClick}>
      {children}
    </button>
  );
};
