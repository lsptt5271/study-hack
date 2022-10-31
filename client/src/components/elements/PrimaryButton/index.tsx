import { ReactNode } from 'react';

type PrimaryButtonProps = {
  className?: string;
  children: ReactNode;
};

export const PrimaryButton = ({ className, children }: PrimaryButtonProps) => {
  return <button className={`rounded border border-primary bg-secondary p-2 text-white ${className || ''}`}>{children}</button>;
};
