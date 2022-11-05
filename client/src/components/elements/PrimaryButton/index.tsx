import { MouseEvent, ReactNode } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

type PrimaryButtonProps = {
  className?: string;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const PrimaryButton = ({
  className,
  children,
  onClick = () => {
    return;
  },
}: PrimaryButtonProps) => {
  return (
    <button className={overrideTailwindClasses(`rounded border border-primary bg-secondary p-2 text-white ${className}`)} onClick={onClick}>
      {children}
    </button>
  );
};
