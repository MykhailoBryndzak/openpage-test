import { useEffect, useRef, useSyncExternalStore } from 'react';
import { observer } from 'mobx-react-lite';
import { AnimatePresence, motion } from 'framer-motion';
import { useStores } from '@stores';
import { elementRegistry } from '@core';
import * as S from './PanelContainer.styles';

const SLIDE_DISTANCE = 80;

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(reducedMotionQuery);
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia(reducedMotionQuery).matches,
    () => window.matchMedia(reducedMotionQuery).matches
  );
}

const panelVariants = (reducedMotion: boolean) => ({
  enter: (direction: number) => ({
    x: reducedMotion ? 0 : direction > 0 ? SLIDE_DISTANCE : direction < 0 ? -SLIDE_DISTANCE : 0,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: reducedMotion ? 0 : direction < 0 ? SLIDE_DISTANCE : -SLIDE_DISTANCE,
    opacity: 0,
  }),
});

const closeVariants = (reducedMotion: boolean) => ({
  open: { x: 0, opacity: 1 },
  closed: {
    x: reducedMotion ? 0 : SLIDE_DISTANCE,
    opacity: 0,
  },
});

export const PanelContainer = observer(function PanelContainer() {
  const rootStore = useStores();
  const { panelStore, activeElementType } = rootStore;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prevStackLength = useRef(panelStore.stack.length);
  const reducedMotion = useReducedMotion();

  const direction = panelStore.stack.length - prevStackLength.current;
  prevStackLength.current = panelStore.stack.length;

  const isVisible = panelStore.isOpen || panelStore.isClosing;

  useEffect(() => {
    if (!isVisible) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-panel-trigger]')) return;
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        panelStore.requestClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible, panelStore]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') panelStore.requestClose();
    };
    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isVisible, panelStore]);

  useEffect(() => {
    if (panelStore.isOpen) {
      const firstFocusable = wrapperRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
  }, [panelStore.isOpen]);

  const handleCloseAnimationComplete = () => {
    const trigger = document.querySelector<HTMLElement>('[data-panel-trigger]');
    trigger?.focus();
    rootStore.closePanel();
  };

  if (!isVisible || !activeElementType) return null;

  const definition = elementRegistry.get(activeElementType);
  if (!definition) return null;

  const activeStore = rootStore.getActiveElementStore();
  if (!activeStore) return null;

  const PanelComponents = {
    main: definition.mainPanelComponent,
    item: definition.itemPanelComponent,
    styles: definition.stylesPanelComponent,
  } as const;

  const CurrentPanel = PanelComponents[panelStore.current.type];
  const panelKey = panelStore.current.type + (panelStore.current.itemId ?? '');
  const variants = panelVariants(reducedMotion);
  const closeVars = closeVariants(reducedMotion);

  const transition = reducedMotion
    ? { duration: 0.1 }
    : { x: { type: 'spring' as const, stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } };

  return (
    <S.Wrapper ref={wrapperRef} role="complementary" aria-label="Settings panel">
      {panelStore.isClosing ? (
        <motion.div
          key="closing"
          variants={closeVars}
          initial="open"
          animate="closed"
          transition={transition}
          onAnimationComplete={handleCloseAnimationComplete}
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <S.PanelContent>
            <CurrentPanel store={activeStore} itemId={panelStore.current.itemId} />
          </S.PanelContent>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={panelKey}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <S.PanelContent>
              <CurrentPanel store={activeStore} itemId={panelStore.current.itemId} />
            </S.PanelContent>
          </motion.div>
        </AnimatePresence>
      )}
    </S.Wrapper>
  );
});
