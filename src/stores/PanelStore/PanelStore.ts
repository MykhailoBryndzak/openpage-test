import { makeAutoObservable } from 'mobx';

export type PanelType = 'main' | 'item' | 'styles';

export type PanelState = {
  type: PanelType;
  itemId?: string;
};

export class PanelStore {
  stack: PanelState[] = [{ type: 'main' }];
  isOpen: boolean = false;
  isClosing: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get current(): PanelState {
    return this.stack[this.stack.length - 1];
  }

  get canGoBack(): boolean {
    return this.stack.length > 1;
  }

  push(type: PanelType, itemId?: string): void {
    this.stack.push({ type, itemId });
  }

  pop(): void {
    if (this.stack.length > 1) {
      this.stack.pop();
    }
  }

  reset(): void {
    this.stack = [{ type: 'main' }];
  }

  openItemPanel(itemId?: string): void {
    this.push('item', itemId);
  }

  openStylesPanel(): void {
    this.push('styles');
  }

  /** Initiates close with animation. PanelContainer calls close() when animation completes. */
  requestClose(): void {
    this.isClosing = true;
  }

  /** Called after close animation completes. */
  close(): void {
    this.isOpen = false;
    this.isClosing = false;
  }

  open(): void {
    this.isOpen = true;
    this.isClosing = false;
    this.reset();
  }
}
