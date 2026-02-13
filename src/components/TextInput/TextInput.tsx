import { useId } from 'react';
import * as S from './TextInput.styles';

type TextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onBlur?: () => void;
  error?: string;
};

export function TextInput({ label, value, onChange, placeholder, onBlur, error }: TextInputProps) {
  const id = useId();

  return (
    <S.Container>
      <S.Label htmlFor={id}>{label}</S.Label>
      <S.Input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-label={label}
        $hasError={Boolean(error)}
        aria-invalid={Boolean(error)}
      />
      {error && <S.ErrorMessage role="alert">{error}</S.ErrorMessage>}
    </S.Container>
  );
}
