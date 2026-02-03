import styled from 'styled-components';

export const Wrapper = styled.aside`
  width: 288px;
  background-color: var(--bg-panel);
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  height: 500px;
  display: flex;
  flex-direction: column;
`;

export const PanelContent = styled.div`
  height: 100%;
`;
