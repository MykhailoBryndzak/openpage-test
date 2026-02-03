import styled from 'styled-components';
import type { TagAlignment } from '../../types';

export const Container = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background-color: var(--bg-secondary);
  border-radius: 8px;
`;

export const Heading = styled.h1`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 32px;
  color: var(--text-primary);
`;

export const TagsContainer = styled.div<{ $alignment: TagAlignment }>`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 600px;
  justify-content: ${({ $alignment }) =>
    $alignment === 'left'
      ? 'flex-start'
      : $alignment === 'right'
        ? 'flex-end'
        : 'center'};
`;
