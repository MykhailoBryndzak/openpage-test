import styled, { css } from 'styled-components';
import { focusRing } from '@styles/mixins';
import { tagStyleVariants } from '../../../styles/TagStyleStrategy';
import type { TagStyle } from '../../../types';
import { PanelContainer } from '../shared/PanelLayout.styles';

export const Container = PanelContainer;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const Section = styled.div`
  padding: 12px 14px;
  border-bottom: 1px solid var(--border-panel);

  &:last-child {
    border-bottom: none;
  }
`;

export const SectionLabel = styled.span`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-label);
  margin-bottom: 6px;
`;

export const StyleButtonsContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const StyleButton = styled.button<{ $style: TagStyle; $active: boolean }>`
  height: 37px;
  padding: 8px 14px;
  font-size: 14px;
  border-radius: 5.8px;
  font-weight: 500;
  transition: all 0.15s;
  cursor: pointer;

  ${({ $style }) => tagStyleVariants[$style]}

  ${({ $active }) =>
    $active &&
    css`
      outline: 2px solid var(--accent-blue);
    `}

  ${focusRing}
`;
