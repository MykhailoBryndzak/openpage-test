import { css } from 'styled-components';

/** Standard focus ring — 2px accent-blue outline */
export const focusRing = css`
  &:focus-visible {
    outline: 2px solid var(--accent-blue);
    outline-offset: 2px;
  }
`;

/** Reset browser button defaults */
export const resetButton = css`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

/** Disabled state — reduced opacity + not-allowed cursor */
export const disabledStyle = css`
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

/** Hover highlight for ghost/transparent buttons */
export const hoverHighlight = css`
  &:hover {
    background-color: var(--bg-input);
    color: var(--text-primary);
  }
`;

/** Active/inactive toggle pattern (ButtonGroup, SizeButton, RadiusButton) */
export const activeToggle = ($active: boolean) =>
  $active
    ? css`
        background-color: var(--bg-active);
        color: var(--text-primary);
      `
    : css`
        background-color: transparent;
        color: var(--text-secondary);

        &:hover {
          background-color: var(--bg-input);
          color: var(--text-primary);
        }
      `;
