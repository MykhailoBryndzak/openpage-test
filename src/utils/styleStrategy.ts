import { css } from 'styled-components';

export type StyleVariant = {
  name: string;
  styles: ReturnType<typeof css>;
};

export type StyleStrategy<TStyle extends string> = {
  getVariant(style: TStyle): StyleVariant;
  getAllVariants(): StyleVariant[];
};

export function createStyleStrategy<TStyle extends string>(
  variants: Record<TStyle, ReturnType<typeof css>>
): StyleStrategy<TStyle> {
  return {
    getVariant(style: TStyle): StyleVariant {
      return {
        name: style,
        styles: variants[style],
      };
    },
    getAllVariants(): StyleVariant[] {
      return Object.entries(variants).map(([name, styles]) => ({
        name,
        styles: styles as ReturnType<typeof css>,
      }));
    },
  };
}
