import type { BaseElementItem, BaseElementStyles } from '@app/types/base';

export type TagItem = BaseElementItem & {
  label: string;
  link: string;
};

export type TagStyle = 'default' | 'outline' | 'filled' | 'ghost';
export type TagSize = 'XL' | 'L' | 'M' | 'S' | 'XS';
export type TagRadius = 0 | 4 | 8 | 12 | 100;
export type TagAlignment = 'left' | 'center' | 'right';

export type TaglineStyles = BaseElementStyles & {
  style: TagStyle;
  size: TagSize;
  radius: TagRadius;
  alignment: TagAlignment;
};

export type TaglineData = {
  items: TagItem[];
  styles: TaglineStyles;
};

export const TAG_STYLES: TagStyle[] = ['default', 'outline', 'filled', 'ghost'];
export const TAG_SIZES: TagSize[] = ['XL', 'L', 'M', 'S', 'XS'];
export const TAG_RADII: TagRadius[] = [0, 4, 8, 12, 100];
export const TAG_ALIGNMENTS: TagAlignment[] = ['left', 'center', 'right'];

export const DEFAULT_TAGLINE_STYLES: TaglineStyles = {
  style: 'default',
  size: 'M',
  radius: 8,
  alignment: 'center',
};
