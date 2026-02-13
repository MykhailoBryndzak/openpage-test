import { makeAutoObservable, runInAction, reaction } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import type { TagItem, TaglineStyles, TaglineData } from '../types';
import { DEFAULT_TAGLINE_STYLES } from '../types';
import type { ElementStore } from '@app/types/base';
import type { TaglinePersistence } from '../api/taglineApi';
import type { SaveErrorCode } from '../api/taglineApi';
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
  saveError: SaveErrorCode | null = null;
  private persistence: TaglinePersistence;
  private debouncedSave: ReturnType<typeof debounce>;

  constructor(persistence: TaglinePersistence) {
    this.persistence = persistence;
    this.debouncedSave = debounce(() => {
      try {
        this.persistence.save(this.data);
        runInAction(() => {
          this.saveError = null;
        });
      } catch (err) {
        runInAction(() => {
          this.saveError = (err as { code?: SaveErrorCode }).code ?? 'unknown';
        });
      }
    }, 300);
    makeAutoObservable(this);
    this.hydrate();

    // Automatically save whenever data changes.
    // JSON.stringify forces a deep read so MobX tracks nested mutations (e.g. updateItem).
    reaction(
      () => JSON.stringify(this.data),
      () => {
        this.debouncedSave();
      }
    );
  }

  private hydrate(): void {
    const saved = this.persistence.fetch();
    if (saved) {
      this.items = saved.items;
      this.styles = { ...DEFAULT_TAGLINE_STYLES, ...saved.styles };
    }
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
