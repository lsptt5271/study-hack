import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

type SelectBoxProps = ComponentPropsWithoutRef<'select'>;

export const SelectBox = forwardRef<HTMLSelectElement, SelectBoxProps>(({ children, className = '', ...props }, ref) => {
  return (
    <select {...props} className={overrideTailwindClasses(`rounded p-2 outline-none ${className}`)} ref={ref}>
      {children}
    </select>
  );
});

SelectBox.displayName = 'SelectBox';
