import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

export const TagList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const TagItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: var(--bg-input);
  border-radius: 6px;

  &:hover .removeButton {
    opacity: 1;
  }
`;

export const DragHandle = styled.button`
  cursor: grab;
  color: var(--text-secondary);
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  touch-action: none;

  &:hover {
    color: var(--text-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-blue);
    outline-offset: 2px;
  }
`;

export const TagLabel = styled.button`
  flex: 1;
  text-align: left;
  font-size: 14px;
  color: var(--text-primary);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: var(--accent-blue);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-blue);
    outline-offset: 2px;
  }
`;

export const RemoveButton = styled.button`
  padding: 4px;
  opacity: 0;
  color: var(--text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #ef4444;
  }

  &:focus {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid var(--accent-blue);
    outline-offset: 2px;
    opacity: 1;
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-top: 12px;
  padding: 8px 12px;
  font-size: 14px;
  color: var(--text-secondary);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--text-primary);
    background-color: var(--bg-input);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-blue);
    outline-offset: 2px;
  }
`;

export const Footer = styled.footer`
  border-top: 1px solid var(--border-color);
`;

export const StylesButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  color: var(--text-primary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--bg-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-blue);
    outline-offset: -2px;
  }
`;

export const StylesButtonLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
