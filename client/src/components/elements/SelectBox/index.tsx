import { forwardRef, ReactNode } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

type SelectBoxProps = {
  children: ReactNode;
  className?: string;
};

export const SelectBox = forwardRef<HTMLSelectElement, SelectBoxProps>(({ children, className = '' }, ref) => {
  return (
    <select className={overrideTailwindClasses(`rounded p-2 outline-none ${className}`)} ref={ref}>
      {children}
    </select>
  );
});

SelectBox.displayName = 'SelectBox';
