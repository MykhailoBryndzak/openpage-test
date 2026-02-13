import type { ElementType, IElementDefinition } from './types';

class ElementRegistryClass {
  private definitions = new Map<ElementType, IElementDefinition>();

  register<TStore = unknown>(definition: IElementDefinition<TStore>): void {
    this.definitions.set(definition.type, definition as IElementDefinition);
  }

  get<TStore = unknown>(type: ElementType): IElementDefinition<TStore> | undefined {
    return this.definitions.get(type) as IElementDefinition<TStore> | undefined;
  }
}

export const elementRegistry = new ElementRegistryClass();
