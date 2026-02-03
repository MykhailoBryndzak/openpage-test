import styled, { css } from 'styled-components';
import type { TagStyle, TagSize, TagRadius } from '../../../types';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Content = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Section = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
`;

export const SectionLabel = styled.legend`
  font-size: 11px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
`;

export const StyleButtonsContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const stylePreviewVariants: Record<TagStyle, ReturnType<typeof css>> = {
  default: css`
    background-color: var(--bg-input);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
  `,
  outline: css`
    background-color: #157bda33;
    border: 1px solid transparent;
    color: var(--accent-blue);
  `,
  filled: css`
    background-color: var(--accent-blue);
    border: 1px solid transparent;
    color: #ffffff;
  `,
  ghost: css`
    background-color: var(--bg-input);
    border: 1px solid transparent;
    color: var(--text-secondary);
  `,
};

export const StyleButton = styled.button<{ $style: TagStyle; $active: boolean }>`
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;

  ${({ $style }) => stylePreviewVariants[$style]}

  ${({ $active }) =>
    $active &&
    css`
      box-shadow: 0 0 0 2px var(--accent-blue), 0 0 0 4px var(--bg-panel);
    `}

  &:focus-visible {
    outline: 2px solid var(--accent-blue);
    outline-offset: 2px;
  }
`;

export const SizeButtonsContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const sizeButtonVariants: Record<TagSize, ReturnType<typeof css>> = {
  XL: css`
    padding: 10px 20px;
    font-size: 18px;
  `,
  L: css`
    padding: 8px 16px;
    font-size: 16px;
  `,
  M: css`
    padding: 6px 12px;
    font-size: 14px;
  `,
  S: css`
    padding: 4px 10px;
    font-size: 12px;
  `,
  XS: css`
    padding: 2px 8px;
    font-size: 12px;
  `,
};

export const SizeButton = styled.button<{ $sizeValue: TagSize; $active: boolean }>`
  background-color: var(--bg-input);
  border: none;
  border-radius: 6px;
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $sizeValue }) => sizeButtonVariants[$sizeValue]}

  ${({ $active }) =>
    $active &&
    css`
      background-color: var(--accent-blue);
      color: #ffffff;
    `}

  &:hover:not([disabled]) {
    ${({ $active }) =>
      !$active &&
      css`
        background-color: var(--bg-hover);
        color: var(--text-primary);
      `}
  }

  &:focus-visible {
    outline: 2px solid var(--accent-blue);
    outline-offset: 2px;
  }
`;

export const RadiusButtonsContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const radiusButtonVariants: Record<TagRadius, ReturnType<typeof css>> = {
  0: css`
    border-radius: 0px;
  `,
  4: css`
    border-radius: 4px;
  `,
  8: css`
    border-radius: 8px;
  `,
  12: css`
    border-radius: 12px;
  `,
  100: css`
    border-radius: 9999px;
  `,
};

export const RadiusButton = styled.button<{ $radius: TagRadius; $active: boolean }>`
  width: 32px;
  height: 32px;
  background-color: var(--bg-input);
  border: none;
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $radius }) => radiusButtonVariants[$radius]}

  ${({ $active }) =>
    $active &&
    css`
      background-color: var(--accent-blue);
      color: #ffffff;
    `}

  &:hover:not([disabled]) {
    ${({ $active }) =>
      !$active &&
      css`
        background-color: var(--bg-hover);
        color: var(--text-primary);
      `}
  }

  &:focus-visible {
    outline: 2px solid var(--accent-blue);
    outline-offset: 2px;
  }
`;
