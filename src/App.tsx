import { StoreContext, rootStore } from '@stores';
import { registerTaglineElement } from '@features/tagline/register';
import { TaglinePreview } from '@features/tagline';
import { PanelContainer, ErrorBoundary } from '@components';
import * as S from './App.styles';

registerTaglineElement();

function App() {
  return (
    <StoreContext.Provider value={rootStore}>
      <ErrorBoundary>
        <S.Container>
          <TaglinePreview />
          <PanelContainer />
        </S.Container>
      </ErrorBoundary>
    </StoreContext.Provider>
  );
}

export default App;
