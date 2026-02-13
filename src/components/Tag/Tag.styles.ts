import styled from 'styled-components';
import { focusRing } from '@styles/mixins';
import type { TagStyle, TagSize } from '@features/tagline';
import { tagStyleVariants, tagSizeVariants } from '@features/tagline';

export const TagButton = styled.button<{
  $tagStyle: TagStyle;
  $size: TagSize;
  $radius: number | string;
}>`
  font-size: 14px;
  line-height: 140%;
  transition: all 0.2s;
  cursor: pointer;
  border-radius: ${({ $radius }) =>
    $radius === 100 ? '9999px' : `${$radius}px`};

  ${({ $size }) => tagSizeVariants[$size]}
  ${({ $tagStyle }) => tagStyleVariants[$tagStyle]}
  ${focusRing}
`;
