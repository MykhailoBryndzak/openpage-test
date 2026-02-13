import styled from 'styled-components';
import type { TagAlignment } from '../../types';

export const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: transparent;
`;

export const Heading = styled.h1`
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.44%;
  margin-bottom: 20px;
  color: var(--text-primary);
  text-align: center;
`;

export const TagsContainer = styled.div<{ $alignment: TagAlignment }>`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  max-width: 430px;
  justify-content: ${({ $alignment }) =>
    $alignment === 'left'
      ? 'flex-start'
      : $alignment === 'right'
        ? 'flex-end'
        : 'center'};
`;
