import { memo } from 'react';
import type { ReactNode } from 'react';
import * as S from './ButtonGroup.styles';

type ButtonGroupOption<T> = {
  value: T;
  label: ReactNode;
};

type ButtonGroupProps<T> = {
  options: ButtonGroupOption<T>[];
  value: T | undefined;
  onChange: (value: T) => void;
  size?: 'sm' | 'md';
  ariaLabel?: string;
};

export const ButtonGroup = memo(function ButtonGroup<T extends string | number>({
  options,
  value,
  onChange,
  size = 'md',
  ariaLabel,
}: ButtonGroupProps<T>) {
  return (
    <S.Container aria-label={ariaLabel}>
      {options.map((option) => (
        <S.Button
          key={String(option.value)}
          onClick={() => onChange(option.value)}
          $active={value === option.value}
          $size={size}
          aria-pressed={value === option.value}
          type="button"
        >
          {option.label}
        </S.Button>
      ))}
    </S.Container>
  );
});
