import styled from 'styled-components';
import type { TagStyle, TagSize } from '@features/tagline';
import { tagStyleVariants, tagSizeVariants } from '@features/tagline';

export const TagButton = styled.button<{
  $tagStyle: TagStyle;
  $size: TagSize;
  $radius: number | string;
}>`
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border-radius: ${({ $radius }) =>
    $radius === 100 ? '9999px' : `${$radius}px`};

  &:focus-visible {
    outline: 2px solid var(--accent-blue);
    outline-offset: 2px;
  }

  ${({ $size }) => tagSizeVariants[$size]}
  ${({ $tagStyle }) => tagStyleVariants[$tagStyle]}
`;
