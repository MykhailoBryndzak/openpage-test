export { TaglineStore } from './stores/TaglineStore';
export { taglineApi, SAVE_ERROR_MESSAGES } from './api/taglineApi';
export type { SaveErrorCode } from './api/taglineApi';

export {
  TaglinePreview,
  MainPanel,
  ItemPanel,
  StylesPanel,
} from './components';
export { registerTaglineElement } from './register';

export type {
  TagItem,
  TagStyle,
  TagSize,
  TagRadius,
  TagAlignment,
  TaglineStyles,
  TaglineData,
} from './types';

export {
  TAG_STYLES,
  TAG_SIZES,
  TAG_RADII,
  TAG_ALIGNMENTS,
  DEFAULT_TAGLINE_STYLES,
} from './types';

export { tagStyleVariants, tagSizeVariants } from './styles/TagStyleStrategy';
