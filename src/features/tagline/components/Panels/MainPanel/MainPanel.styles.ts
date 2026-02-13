import styled from 'styled-components';
import { focusRing, resetButton, hoverHighlight } from '@styles/mixins';
import { PanelContainer } from '../shared/PanelLayout.styles';

export const Container = PanelContainer;

export const SaveErrorBanner = styled.div`
  padding: 8px 14px;
  font-size: 13px;
  color: #fbbf24;
  background-color: rgba(251, 191, 36, 0.15);
  border-bottom: 1px solid rgba(251, 191, 36, 0.3);
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 13px 14px 14px 14px;
  border-bottom: 1px solid var(--border-panel);
`;

export const TagList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const TagItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding-left: 13px;
  padding-right: 4px;
  background: transparent;
  border-radius: 6px;
  transition: background-color 0.15s;

  &:hover {
    background-color: var(--bg-input);
  }

  &:hover .removeButton {
    opacity: 1;
  }
`;

export const DragHandle = styled.button`
  ${resetButton}
  cursor: grab;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  touch-action: none;
  flex-shrink: 0;

  &:hover {
    color: var(--text-primary);
  }

  ${focusRing}
`;

export const TagLabel = styled.button`
  ${resetButton}
  flex: 1;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.2%;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.2s;

  ${focusRing}
`;

export const RemoveButton = styled.button`
  ${resetButton}
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  color: var(--text-secondary);
  border-radius: 6px;
  transition: all 0.15s;
  flex-shrink: 0;

  &:hover {
    color: #ef4444;
    background-color: rgba(239, 68, 68, 0.1);
  }

  &:focus {
    opacity: 1;
  }

  ${focusRing}
`;

export const AddButton = styled.button`
  ${resetButton}
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 48px;
  margin-top: 4px;
  padding-left: 13px;
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.44%;
  color: var(--text-secondary);
  border-radius: 6px;
  transition: all 0.15s;

  ${hoverHighlight}
  ${focusRing}
`;

export const Footer = styled.footer`
  flex-shrink: 0;
`;

export const StylesButton = styled.button`
  ${resetButton}
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  padding: 5px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  border-radius: 0 0 4px 4px;
  transition: background-color 0.15s;

  &:hover {
    background-color: var(--bg-input);
  }

  ${focusRing}
`;

export const StylesButtonLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  color: var(--text-secondary);
  font-size: 14px;
  text-align: center;
  gap: 8px;
`;
