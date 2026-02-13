import styled from 'styled-components';
import { focusRing, resetButton } from '@styles/mixins';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 24px;
  text-align: center;
  background-color: var(--bg-primary);
`;

export const Heading = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 8px;
`;

export const Message = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 16px;
`;

export const RetryButton = styled.button`
  ${resetButton}
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--accent-blue);
  background-color: transparent;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: rgba(59, 130, 246, 0.1);
  }

  ${focusRing}
`;
