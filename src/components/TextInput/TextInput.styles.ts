import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: var(--text-label); 
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  background-color: var(--bg-input);
  border: 1px solid ${({ $hasError }) => ($hasError ? '#ef4444' : 'var(--border-panel)')};
  border-radius: 6px;
  padding: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  outline: none;
  transition: border-color 0.15s;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? '#ef4444' : 'rgba(78, 76, 246, 0.3)')};
  }

  &::placeholder {
    color: var(--text-secondary);
    font-weight: 400;
  }
`;

export const ErrorMessage = styled.span`
  font-size: 12px;
  color: #ef4444;
`;
