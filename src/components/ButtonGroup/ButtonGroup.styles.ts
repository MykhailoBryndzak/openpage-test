import styled, { css } from 'styled-components';
import { focusRing, activeToggle } from '@styles/mixins';

export const Container = styled.div.attrs({
  role: 'group',
})`
  display: flex;
  gap: 3.8px;
`;

export const Button = styled.button<{ $active: boolean; $size: 'sm' | 'md' }>`
  height: 37px;
  border-radius: 5.8px;
  font-weight: 500;
  transition: all 0.15s;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $size }) =>
    $size === 'sm'
      ? css`
          padding: 8px 14px;
          font-size: 12px;
        `
      : css`
          padding: 8px 14px;
          font-size: 14px;
        `}

  ${({ $active }) => activeToggle($active)}
  ${focusRing}
`;
