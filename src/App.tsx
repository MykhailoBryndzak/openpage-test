import { lazy, Suspense } from 'react';
import { StoreContext, rootStore } from '@stores';
import * as S from './App.styles';

// Lazy load feature components for code splitting
const TaglinePreview = lazy(() => import('@features/tagline').then(module => ({ default: module.TaglinePreview })));
const PanelContainer = lazy(() => import('@features/tagline').then(module => ({ default: module.PanelContainer })));

function App() {
  return (
    <StoreContext.Provider value={rootStore}>
      <S.Container>
        <S.Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <TaglinePreview />
          </Suspense>
          <Suspense fallback={<div>Loading panels...</div>}>
            <PanelContainer />
          </Suspense>
        </S.Layout>
      </S.Container>
    </StoreContext.Provider>
  );
}

export default App;
