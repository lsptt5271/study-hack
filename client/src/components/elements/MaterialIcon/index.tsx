import { MouseEvent } from 'react';

type MaterialIconProps = {
  children: string;
  className?: string;
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
};

export const MaterialIcon = ({
  children,
  className = '',
  onClick = () => {
    return;
  },
}: MaterialIconProps) => {
  return (
    <span className={`material-icons ${className}`} onClick={onClick}>
      {children}
    </span>
  );
};
