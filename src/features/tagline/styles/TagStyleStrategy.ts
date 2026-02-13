import { css } from 'styled-components';
import type { TagStyle, TagSize } from '../types';

export const tagStyleVariants: Record<TagStyle, ReturnType<typeof css>> = {
  default: css`
    background-color: var(--default-bg);
    border: 1px solid var(--default-bg);
    color: var(--text-primary);

    &:hover {
      border-color: rgba(255, 255, 255, 0.2);
    }
  `,
  outline: css`
    background-color: var(--tag-outline);
    border: 1px solid transparent;
    color: var(--accent-blue);

    &:hover {
      background-color: var(--tag-outline);
    }
  `,
  filled: css`
    background-color: var(--accent-blue);
    border: 1px solid transparent;
    color: #ffffff;

    &:hover {
      opacity: 0.9;
    }
  `,
  ghost: css`
    background-color: transparent;
    border: 1px solid var(--tag-border);
    color: var(--text-secondary);

    &:hover {
      color: var(--text-primary);
    }
  `,
};

export const tagSizeVariants: Record<TagSize, ReturnType<typeof css>> = {
  XL: css`
    padding: 12px 28px;
    font-size: 20px;
  `,
  L: css`
    padding: 10px 24px;
    font-size: 18px;
  `,
  M: css`
    padding: 8px 20px;
    font-size: 16px;
  `,
  S: css`
    padding: 6px 16px;
    font-size: 14px;
  `,
  XS: css`
    padding: 4px 12px;
    font-size: 12px;
  `,
};
