import { createContext, useContext } from 'react';
import type { ElementType } from '@core';
import { TaglineStore } from '@features/tagline/stores/TaglineStore';
import { taglineApi } from '@features/tagline/api/taglineApi';
import { PanelStore } from '@stores/PanelStore';
import type { BaseElementItem, BaseElementStyles, ElementStore } from '@app/types/base';

export class RootStore {
  elementStores: Map<ElementType, ElementStore<BaseElementItem, BaseElementStyles>>;
  activeElementType: ElementType | null = null;
  panelStore: PanelStore;

  constructor() {
    this.elementStores = new Map();
    this.elementStores.set('tagline', new TaglineStore(taglineApi) as ElementStore<BaseElementItem, BaseElementStyles>);
    this.panelStore = new PanelStore();
  }

  openPanel(elementType: ElementType): void {
    this.activeElementType = elementType;
    this.panelStore.open();
  }

  closePanel(): void {
    this.activeElementType = null;
    this.panelStore.close();
  }

  getActiveElementStore<T>(): T | undefined {
    if (!this.activeElementType) return undefined;
    return this.elementStores.get(this.activeElementType) as T | undefined;
  }
}

export const rootStore = new RootStore();
export const StoreContext = createContext<RootStore>(rootStore);

export function useStores(): RootStore {
  return useContext(StoreContext);
}

export function useTaglineStore(): TaglineStore {
  return useStores().elementStores.get('tagline') as TaglineStore;
}

export function usePanelStore(): PanelStore {
  return useStores().panelStore;
}
