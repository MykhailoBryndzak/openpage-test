import type { ComponentType } from 'react';
import type { ElementStore } from '@app/types/base';
import type { BaseElementItem, BaseElementStyles } from '@app/types/base';

export type ElementType = 'tagline' | 'button';

export interface IElementDefinition<TStore = unknown> {
  type: ElementType;
  mainPanelComponent: ComponentType<{ store: TStore }>;
  itemPanelComponent: ComponentType<{ store: TStore; itemId?: string }>;
  stylesPanelComponent: ComponentType<{ store: TStore }>;
}

export type { BaseElementItem, BaseElementStyles, ElementStore };
