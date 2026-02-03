import { createContext, useContext } from 'react';
import { TaglineStore } from '@features/tagline';
import { PanelStore } from '@stores/PanelStore';

export class RootStore {
  taglineStore: TaglineStore;
  panelStore: PanelStore;

  constructor() {
    this.taglineStore = new TaglineStore();
    this.panelStore = new PanelStore();
  }
}

export const rootStore = new RootStore();
export const StoreContext = createContext<RootStore>(rootStore);

export function useStores(): RootStore {
  return useContext(StoreContext);
}

export function useTaglineStore(): TaglineStore {
  return useStores().taglineStore;
}

export function usePanelStore(): PanelStore {
  return useStores().panelStore;
}
