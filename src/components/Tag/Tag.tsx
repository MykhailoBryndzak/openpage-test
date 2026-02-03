import { memo } from 'react';
import type { TagStyle, TagSize, TagRadius } from '@features/tagline';
import * as S from './Tag.styles';

type TagProps = {
  label: string;
  tagStyle: TagStyle;
  size: TagSize;
  radius: TagRadius;
  onClick?: () => void;
};

export const Tag = memo(function Tag({ label, tagStyle, size, radius, onClick }: TagProps) {
  return (
    <S.TagButton
      onClick={onClick}
      $tagStyle={tagStyle}
      $size={size}
      $radius={radius}
      aria-label={`Tag: ${label}`}
    >
      {label}
    </S.TagButton>
  );
});
