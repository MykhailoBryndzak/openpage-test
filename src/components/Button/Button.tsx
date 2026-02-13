import { memo } from 'react';
import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { StyledButton } from './Button.styles';
import type { ButtonVariant } from './Button.styles';

type ButtonProps = {
  variant?: ButtonVariant;
  icon?: ReactNode;
  fullWidth?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'ref'>;

export const Button = memo(function Button({
  variant = 'secondary',
  icon,
  fullWidth = true,
  children,
  type = 'button',
  ref,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      ref={ref}
      $variant={variant}
      $fullWidth={fullWidth}
      type={type}
      {...props}
    >
      {icon}
      {children && <span>{children}</span>}
    </StyledButton>
  );
});
