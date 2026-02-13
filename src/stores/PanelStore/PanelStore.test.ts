import { describe, it, expect, beforeEach } from 'vitest';
import { PanelStore } from './PanelStore';

describe('PanelStore', () => {
  let store: PanelStore;

  beforeEach(() => {
    store = new PanelStore();
  });

  describe('push()', () => {
    it('adds panel to stack', () => {
      store.push('item', 'test-id');

      expect(store.stack.length).toBe(2);
      expect(store.current.type).toBe('item');
      expect(store.current.itemId).toBe('test-id');
    });
  });

  describe('pop()', () => {
    it('removes panel from stack', () => {
      store.push('styles');
      store.pop();

      expect(store.stack.length).toBe(1);
      expect(store.current.type).toBe('main');
    });
  });

  describe('openItemPanel()', () => {
    it('opens item panel with optional itemId', () => {
      store.openItemPanel('item-123');

      expect(store.current.type).toBe('item');
      expect(store.current.itemId).toBe('item-123');
    });
  });

  describe('openStylesPanel()', () => {
    it('opens styles panel', () => {
      store.openStylesPanel();

      expect(store.current.type).toBe('styles');
    });
  });

  describe('canGoBack', () => {
    it('returns true when stack has multiple panels', () => {
      store.push('styles');

      expect(store.canGoBack).toBe(true);
    });

    it('returns false when on main panel', () => {
      expect(store.canGoBack).toBe(false);
    });
  });

  describe('requestClose()', () => {
    it('sets isClosing to true', () => {
      store.open();
      store.requestClose();

      expect(store.isClosing).toBe(true);
      expect(store.isOpen).toBe(true);
    });
  });

  describe('close()', () => {
    it('sets isOpen and isClosing to false', () => {
      store.open();
      store.requestClose();
      store.close();

      expect(store.isOpen).toBe(false);
      expect(store.isClosing).toBe(false);
    });
  });

  describe('open()', () => {
    it('sets isOpen to true and resets stack', () => {
      store.open();
      store.push('styles');
      store.requestClose();
      store.close();
      store.open();

      expect(store.isOpen).toBe(true);
      expect(store.isClosing).toBe(false);
      expect(store.stack.length).toBe(1);
    });
  });
});
