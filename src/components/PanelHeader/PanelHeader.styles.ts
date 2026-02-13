import styled from 'styled-components';
import { focusRing, resetButton, hoverHighlight, disabledStyle } from '@styles/mixins';

export const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 56px;
  padding: 0 14px;
  border-bottom: 1px solid var(--border-panel);
  flex-shrink: 0;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Title = styled.h2`
  font-weight: 500;
  font-size: 16px;
  margin: 0;
  color: var(--text-primary);
`;

export const IconButton = styled.button`
  ${resetButton}
  width: 32px;
  height: 32px;
  border-radius: 6px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  ${hoverHighlight}
  ${focusRing}
  ${disabledStyle}
`;
