import styled from 'styled-components';
import { PanelContainer } from '../shared/PanelLayout.styles';

export const Container = PanelContainer;

export const Content = styled.div`
  flex: 1;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #2a2a2a;
`;

export const ButtonRow = styled.div`
  margin-top: 15px;
`;
