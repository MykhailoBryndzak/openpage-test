import styled, { css } from 'styled-components';

export const Container = styled.div.attrs({
  role: 'group',
})`
  display: flex;
  gap: 4px;
`;

export const Button = styled.button<{ $active: boolean; $size: 'sm' | 'md' }>`
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--accent-blue);
    outline-offset: 2px;
  }

  ${({ $size }) =>
    $size === 'sm'
      ? css`
          padding: 4px 8px;
          font-size: 12px;
        `
      : css`
          padding: 6px 12px;
          font-size: 14px;
        `}

  ${({ $active }) =>
    $active
      ? css`
          background-color: var(--accent-blue);
          color: #ffffff;
        `
      : css`
          background-color: var(--bg-input);
          color: var(--text-secondary);

          &:hover {
            background-color: var(--bg-hover);
            color: var(--text-primary);
          }
        `}
`;
