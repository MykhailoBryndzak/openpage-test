import { observer } from 'mobx-react-lite';
import { motion, AnimatePresence } from 'framer-motion';
import { usePanelStore } from '@stores';
import { MainPanel } from '../MainPanel';
import { ItemPanel } from '../ItemPanel';
import { StylesPanel } from '../StylesPanel';
import * as S from './PanelContainer.styles';

const panelVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
};

const PanelComponents = {
  main: MainPanel,
  item: ItemPanel,
  styles: StylesPanel,
} as const;

export const PanelContainer = observer(function PanelContainer() {
  const panelStore = usePanelStore();

  if (!panelStore.isOpen) {
    return null;
  }

  const CurrentPanel = PanelComponents[panelStore.current.type];
  const direction = panelStore.stack.length;

  return (
    <S.Wrapper role="complementary" aria-label="Settings panel">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={panelStore.current.type + (panelStore.current.itemId ?? '')}
          custom={direction}
          variants={panelVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.15 },
          }}
          style={{ height: '100%' }}
        >
          <S.PanelContent>
            <CurrentPanel />
          </S.PanelContent>
        </motion.div>
      </AnimatePresence>
    </S.Wrapper>
  );
});
