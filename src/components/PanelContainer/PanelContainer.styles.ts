import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
`;

export const Wrapper = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: var(--panel-width);
  max-height: calc(100vh - 48px);
  background: var(--bg-panel);
  backdrop-filter: blur(var(--panel-blur));
  -webkit-backdrop-filter: blur(var(--panel-blur));
  border-radius: var(--panel-radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 101;
`;

export const PanelContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
