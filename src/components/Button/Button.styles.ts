import styled, { css } from 'styled-components';
import { focusRing, disabledStyle } from '@styles/mixins';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const variants: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    color: #ffffff;
    background-color: var(--default-bg);
    border: none;

    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  `,
  secondary: css`
    color: var(--text-primary);
    background-color: transparent;
    border: 1px solid var(--border-panel);

    &:hover:not(:disabled) {
      background-color: var(--bg-input);
    }
  `,
  ghost: css`
    color: var(--text-secondary);
    background-color: transparent;
    border: none;

    &:hover:not(:disabled) {
      background-color: var(--bg-input);
      color: var(--text-primary);
    }
  `,
};

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $fullWidth: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;

  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`}
  ${({ $variant }) => variants[$variant]}
  ${disabledStyle}
  ${focusRing}
`;
