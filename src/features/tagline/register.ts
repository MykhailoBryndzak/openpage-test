import { elementRegistry } from '@core';
import { MainPanel } from './components/Panels/MainPanel';
import { ItemPanel } from './components/Panels/ItemPanel';
import { StylesPanel } from './components/Panels/StylesPanel';
import type { TaglineStore } from './stores/TaglineStore';

export function registerTaglineElement(): void {
  elementRegistry.register<TaglineStore>({
    type: 'tagline',
    mainPanelComponent: MainPanel,
    itemPanelComponent: ItemPanel,
    stylesPanelComponent: StylesPanel,
  });
}
