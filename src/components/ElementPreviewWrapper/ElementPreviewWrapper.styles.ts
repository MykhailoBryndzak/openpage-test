import styled from 'styled-components';
import { focusRing, resetButton, hoverHighlight } from '@styles/mixins';

export const Wrapper = styled.section`
  position: relative;
  width: 500px;
  height: 500px;
  margin: 24px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 24px;
  padding-top: 48px;
  background-color: var(--bg-primary);
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: auto;
`;

export const GearButton = styled.button`
  ${resetButton}
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: var(--text-secondary);
  opacity: 0;
  transition: opacity 0.15s, color 0.15s, background-color 0.15s;

  ${Wrapper}:hover &,
  ${Wrapper}:focus-within & {
    opacity: 1;
  }

  ${hoverHighlight}
  ${focusRing}
`;
