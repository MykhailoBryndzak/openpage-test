import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.label`
  font-size: 11px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const Input = styled.input`
  background-color: var(--bg-input);
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  color: var(--text-primary);
  outline: none;
  transition: box-shadow 0.2s;

  &:focus {
    box-shadow: 0 0 0 2px var(--accent-blue);
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px var(--accent-blue);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;
