export type BaseElementItem = {
  id: string;
};

export type BaseElementStyles = {
  alignment: 'left' | 'center' | 'right';
};

export type BaseElementData<
  TItem extends BaseElementItem,
  TStyles extends BaseElementStyles,
> = {
  items: TItem[];
  styles: TStyles;
};

export type ElementStore<
  TItem extends BaseElementItem,
  TStyles extends BaseElementStyles,
> = {
  items: TItem[];
  styles: TStyles;
  addItem(...args: unknown[]): string;
  updateItem(id: string, updates: Partial<Omit<TItem, 'id'>>): void;
  removeItem(id: string): void;
  getItem(id: string): TItem | undefined;
  updateStyles(updates: Partial<TStyles>): void;
  readonly data: BaseElementData<TItem, TStyles>;
};
