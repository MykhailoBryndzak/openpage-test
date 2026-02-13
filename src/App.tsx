import { lazy, Suspense } from 'react';
import { StoreContext, rootStore } from '@stores';
import { registerTaglineElement } from '@features/tagline/register';
import * as S from './App.styles';

registerTaglineElement();

const taglineModule = () => import('@features/tagline');
const TaglinePreview = lazy(() => taglineModule().then(module => ({ default: module.TaglinePreview })));
const PanelContainer = lazy(() => import('@components/PanelContainer').then(m => ({ default: m.PanelContainer })));

function AppContent() {
  return (
    <S.Container>
      <Suspense fallback={null}>
        <TaglinePreview />
      </Suspense>
      <Suspense fallback={null}>
        <PanelContainer />
      </Suspense>
    </S.Container>
  );
}

function App() {
  return (
    <StoreContext.Provider value={rootStore}>
      <AppContent />
    </StoreContext.Provider>
  );
}

export default App;
