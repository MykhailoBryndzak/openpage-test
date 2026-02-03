import { css } from 'styled-components';
import { createStyleStrategy } from '@utils/styleStrategy';
import type { TagStyle, TagSize } from '../types';

export const tagStyleVariants: Record<TagStyle, ReturnType<typeof css>> = {
  default: css`
    background-color: var(--bg-input);
    border: 1px solid var(--border-color);
    color: var(--text-primary);

    &:hover {
      border-color: var(--text-secondary);
    }
  `,
  outline: css`
    background-color: #157bda33;
    border: 1px solid transparent;
    color: var(--accent-blue);

    &:hover {
      background-color: #157bda55;
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
    background-color: var(--bg-input);
    border: 1px solid transparent;
    color: var(--text-secondary);

    &:hover {
      color: var(--text-primary);
    }
  `,
};

export const tagSizeVariants: Record<TagSize, ReturnType<typeof css>> = {
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

export const tagStyleStrategy = createStyleStrategy(tagStyleVariants);
export const tagSizeStrategy = createStyleStrategy(tagSizeVariants);
