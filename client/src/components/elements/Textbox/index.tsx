import { ComponentPropsWithoutRef, forwardRef, useCallback, useMemo } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

type TextboxProps = ComponentPropsWithoutRef<'input'> & {
  error?: boolean;
};

export const Textbox = forwardRef<HTMLInputElement, TextboxProps>(({ error = false, ...props }, ref) => {
  const dynamicStyle = useMemo(() => {
    return error ? 'border-rose-600' : 'border-white';
  }, [error]);
  return <input type="text" {...props} ref={ref} className={overrideTailwindClasses(`rounded border-[1px] p-2 outline-none ${dynamicStyle} ${props.className}`)} />;
});

Textbox.displayName = 'Textbox';
