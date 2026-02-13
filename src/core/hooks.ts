import { useStores } from '@stores';

export function useActiveElementStore<T>(): T {
  const { activeElementType, getActiveElementStore } = useStores();
  if (!activeElementType) {
    throw new Error('No active element — panel is closed');
  }
  const store = getActiveElementStore<T>();
  if (!store) {
    throw new Error(`No store found for element type: ${activeElementType}`);
  }
  return store;
}
