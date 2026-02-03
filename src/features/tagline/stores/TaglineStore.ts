import { makeAutoObservable, runInAction, reaction } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import type { TagItem, TaglineStyles, TaglineData } from '../types';
import { DEFAULT_TAGLINE_STYLES } from '../types';
import type { ElementStore } from '@app/types/base';
import { taglineApi } from '../api/taglineApi';
import { debounce } from '@utils/debounce';

const DEFAULT_ITEMS: TagItem[] = [
  { id: uuidv4(), label: 'Marketing', link: 'https://onepage.io' },
  { id: uuidv4(), label: 'Design', link: 'https://onepage.io' },
  { id: uuidv4(), label: 'Development', link: 'https://onepage.io' },
  { id: uuidv4(), label: 'Front', link: 'https://onepage.io' },
  { id: uuidv4(), label: 'AI Engineering', link: 'https://onepage.io' },
];

export class TaglineStore implements ElementStore<TagItem, TaglineStyles> {
  items: TagItem[] = DEFAULT_ITEMS;
  styles: TaglineStyles = { ...DEFAULT_TAGLINE_STYLES };
  private debouncedSave = debounce(() => {
    taglineApi.save(this.data);
  }, 300);

  constructor() {
    makeAutoObservable(this);
    
    // Automatically save whenever data changes
    reaction(
      () => this.data,
      () => {
        this.debouncedSave();
      }
    );
  }

  addItem(label: string, link: string): string {
    const id = uuidv4();
    runInAction(() => {
      this.items.push({ id, label, link });
    });
    return id;
  }

  updateItem(id: string, updates: Partial<Omit<TagItem, 'id'>>): void {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      runInAction(() => {
        Object.assign(item, updates);
      });
    }
  }

  removeItem(id: string): void {
    runInAction(() => {
      this.items = this.items.filter((i) => i.id !== id);
    });
  }

  reorderItems(fromIndex: number, toIndex: number): void {
    runInAction(() => {
      const [item] = this.items.splice(fromIndex, 1);
      this.items.splice(toIndex, 0, item);
    });
  }

  updateStyles(updates: Partial<TaglineStyles>): void {
    runInAction(() => {
      Object.assign(this.styles, updates);
    });
  }

  getItem(id: string): TagItem | undefined {
    return this.items.find((i) => i.id === id);
  }

  get data(): TaglineData {
    return {
      items: this.items,
      styles: this.styles,
    };
  }
}
