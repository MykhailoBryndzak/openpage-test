# Документація проєкту: Tagline Element Editor

## Огляд

**Мета:** Інтерактивний редактор елемента "Tagline" для no-code конструктора сайтів.

**Demo:** [Посилання на Vercel/Netlify]

**Репозиторій:** [GitHub посилання]

---

## Стек технологій

| Технологія | Версія | Призначення |
|------------|--------|-------------|
| React | 19 | UI фреймворк |
| TypeScript | 5.x | Типізація |
| MobX | 6.x | Управління станом |
| Styled Components | 6.x | Стилізація |
| Framer Motion | 11.x | Анімації |
| @dnd-kit | 6.x | Drag & Drop |
| Vitest | 4.x | Unit тестування |
| Vite | 7.x | Bundler |

---

## Архітектура

### Feature-Sliced Design (FSD)

Проєкт побудований за принципом **Feature-Sliced Design** — кожна фіча є самодостатнім модулем.

```
src/
├── features/                    # Бізнес-фічі
│   └── tagline/
│       ├── api/                 # API виклики
│       │   └── taglineApi.ts
│       ├── components/          # UI компоненти фічі
│       │   ├── Panels/
│       │   │   ├── MainPanel/
│       │   │   ├── ItemPanel/
│       │   │   ├── StylesPanel/
│       │   │   └── PanelContainer/
│       │   └── Preview/
│       ├── stores/              # MobX store
│       ├── styles/              # Стратегії стилів
│       ├── types/               # TypeScript типи
│       └── index.ts             # Публічний API
│
├── components/                  # Глобальні UI компоненти
│   ├── Tag/
│   ├── TextInput/
│   ├── ButtonGroup/
│   ├── PanelHeader/
│   └── Icons/
│
├── stores/                      # Глобальні stores
│   ├── PanelStore/
│   └── RootStore/
│
├── types/                       # Базові типи
│   └── base/
│
└── utils/                       # Утиліти
    ├── debounce.ts
    └── styleStrategy.ts
```

**Чому FSD?**
- ✅ Ізоляція фіч — легко додавати нові елементи
- ✅ Чіткі межі — зрозуміло що імпортувати
- ✅ Тестованість — кожна фіча тестується окремо
- ✅ Масштабованість — команда може працювати паралельно

---

## Патерни проєктування

### 1. Observer Pattern (MobX)

**Файли:** `TaglineStore.ts`, всі компоненти з `observer()`

```typescript
// Store автоматично відслідковує зміни
export class TaglineStore {
  items: TagItem[] = [];
  
  constructor() {
    makeAutoObservable(this);
    
    // Reaction — автоматичне збереження при зміні даних
    reaction(
      () => this.data,
      () => this.debouncedSave()
    );
  }
}

// Компонент перерендериться автоматично
const TaglinePreview = observer(() => {
  const store = useTaglineStore();
  return <>{store.items.map(...)}</>;
});
```

**Переваги:**
- Granular reactivity — перерендер тільки змінених компонентів
- Менше boilerplate ніж Redux
- Простий API для мутацій

---

### 2. Strategy Pattern (Стилі)

**Файл:** `src/features/tagline/styles/TagStyleStrategy.ts`

```typescript
// Кожен стиль — окрема стратегія
export const tagStyleVariants: Record<TagStyle, ReturnType<typeof css>> = {
  default: css`
    background-color: var(--bg-input);
    border: 1px solid var(--border-color);
  `,
  outline: css`
    background-color: #157bda33;
    color: var(--accent-blue);
  `,
  // ...
};

// Використання в компоненті
const TagButton = styled.button`
  ${({ $tagStyle }) => tagStyleVariants[$tagStyle]}
`;
```

**Переваги:**
- Легко додати новий стиль без зміни компонентів
- Перевикористання між Preview та StylesPanel
- Централізоване управління варіантами

---

### 3. Repository Pattern (API Layer)

**Файл:** `src/features/tagline/api/taglineApi.ts`

```typescript
export const taglineApi = {
  save(data: TaglineData): void {
    console.log(`POST ${API_BASE}/tagline`, data);
  },

  async fetch(): Promise<TaglineData | null> {
    console.log(`GET ${API_BASE}/tagline`);
    return null;
  },
};
```

**Переваги:**
- Абстракція над HTTP клієнтом
- Легко замінити console.log на fetch/axios
- Централізована точка для всіх запитів фічі

---

### 4. Debouncing Pattern

**Файл:** `src/utils/debounce.ts`

```typescript
// Store використовує debounce для оптимізації
private debouncedSave = debounce(() => {
  taglineApi.save(this.data);
}, 300);
```

**Проблема:** При швидкому введенні тексту кожен keystroke викликав API.

**Рішення:** Debounce з 300ms затримкою — API викликається тільки коли користувач зупинився.

**Результат:** Зменшення кількості запитів на ~90%.

---

### 5. Dependency Injection (React Context)

**Файл:** `src/stores/RootStore/RootStore.ts`

```typescript
export const StoreContext = createContext<RootStore>(rootStore);

// Хуки для типобезпечного доступу
export function useTaglineStore(): TaglineStore {
  return useContext(StoreContext).taglineStore;
}
```

**Переваги:**
- Легке тестування (можна підмінити store)
- Ізоляція залежностей
- Type-safe API

---

## Реалізовані вимоги

| Вимога | Статус | Реалізація |
|--------|--------|------------|
| Preview Area | ✅ | `TaglinePreview.tsx` |
| Main Panel | ✅ | `MainPanel.tsx` + drag & drop |
| Create Item | ✅ | `ItemPanel.tsx` (без itemId) |
| Edit Item | ✅ | `ItemPanel.tsx` (з itemId) |
| Styles Panel | ✅ | `StylesPanel.tsx` |
| Data Persistence | ✅ | `taglineApi.save()` + debounce |
| Panel Animations | ✅ | Framer Motion |
| Drag & Drop | ✅ | @dnd-kit |

---

## Оптимізації

### 1. Debounced API Calls
- **Проблема:** 100+ API викликів при швидкому введенні
- **Рішення:** Debounce 300ms
- **Результат:** 1-2 виклики замість 100+

### 2. MobX Reaction для Auto-Save
- **Проблема:** Ручний виклик `saveToServer()` в кожному методі
- **Рішення:** `reaction()` автоматично відстежує зміни
- **Результат:** DRY код, неможливо забути зберегти

### 3. onBlur vs onChange
- **Проблема:** Оновлення store на кожен keystroke
- **Рішення:** Локальний state + оновлення на blur
- **Результат:** Плавний UX без лагів

---

## Accessibility (a11y)

Реалізовано:
- `aria-label` на всіх кнопках і інпутах
- `aria-pressed` для toggle кнопок (стилі, розміри)
- `role="group"` для ButtonGroup
- `role="list"` для списку тегів
- `:focus-visible` стилі для клавіатурної навігації
- Семантичні HTML теги (`<header>`, `<section>`, `<fieldset>`)
- Drag handles з описовими labels

---

## Тестування

**Підхід:** Happy Path тести для критичних шляхів

**Покриття:**
- `PanelStore` — навігація (push, pop, reset)
- `Tag` — рендер, клік, стилі
- `TextInput` — рендер, введення, placeholder
- `ButtonGroup` — опції, вибір

```bash
npm run test:run      # Запуск тестів
npm run test:coverage # З coverage звітом
```

---

## ADRs (Architecture Decision Records)

Проєкт містить документацію архітектурних рішень:

| ADR | Рішення |
|-----|---------|
| [ADR-0001](./adr/0001-feature-sliced-design.md) | Feature-Sliced Design |
| [ADR-0002](./adr/0002-mobx-state-management.md) | MobX для стану |
| [ADR-0003](./adr/0003-api-debouncing-strategy.md) | Debouncing API |
| [ADR-0004](./adr/0004-component-update-strategy.md) | onBlur замість onChange |
| [ADR-0005](./adr/0005-drag-and-drop-implementation.md) | @dnd-kit для D&D |

---

## Розширюваність

### Додавання нового елемента (Hero, Button, etc.)

```bash
# 1. Створити структуру
mkdir -p src/features/hero/{api,components,stores,types,styles}
```

```typescript
// 2. Типи розширюють базові інтерфейси
// src/features/hero/types/index.ts
import type { BaseElementItem, BaseElementStyles } from '@app/types/base';

type HeroItem = BaseElementItem & {
  title: string;
  subtitle: string;
  image: string;
};

type HeroStyles = BaseElementStyles & {
  layout: 'centered' | 'left' | 'right';
  overlay: boolean;
};
```

```typescript
// 3. Store імплементує контракт
// src/features/hero/stores/HeroStore.ts
export class HeroStore implements ElementStore<HeroItem, HeroStyles> {
  // TypeScript гарантує реалізацію всіх методів
}
```

```typescript
// 4. Додати в RootStore
// src/stores/RootStore/RootStore.ts
import { HeroStore } from '@features/hero';

export class RootStore {
  taglineStore: TaglineStore;
  heroStore: HeroStore;  // Новий store
  panelStore: PanelStore;
}
```

---

## Що можна покращити

1. **Реальний API** — замінити console.log на fetch з error handling
2. **Optimistic Updates** — UI оновлюється миттєво, rollback при помилці
3. **Undo/Redo** — MobX snapshots для історії змін
4. **E2E тести** — Playwright для повних сценаріїв
5. **Storybook** — документація компонентів
6. **Error Boundaries** — graceful handling помилок

---

## Питання для інтерв'ю

### Q: Чому MobX, а не Redux?

**A:** MobX обрано через:
- Менше boilerplate (немає actions/reducers)
- Granular reactivity з коробки
- Простіший для невеликих/середніх проєктів
- Вакансія вказує MobX як плюс

Redux краще для великих команд з strict conventions.

---

### Q: Як би ви додали новий елемент?

**A:** 
1. Створити `features/newElement/` з типами, store, компонентами
2. Типи розширюють `BaseElementItem` та `BaseElementStyles`
3. Store імплементує `ElementStore<TItem, TStyles>`
4. Додати в `RootStore`
5. UI компоненти перевикористовують `Tag`, `TextInput`, `ButtonGroup`

---

### Q: Чому Styled Components?

**A:**
- Вакансія вказує SCSS — SC концептуально близький
- Динамічні стилі через props (`$tagStyle`, `$size`)
- Повна TypeScript типізація
- Колокація стилів з компонентами

---

### Q: Як оптимізувати перформанс?

**A:**
- `React.memo` для leaf компонентів
- `useMemo` для важких обчислень
- Virtualization для довгих списків (@tanstack/virtual)
- Code splitting для великих фіч

---

### Q: Як би ви реалізували Undo/Redo?

**A:** MobX має вбудовану підтримку snapshots:

```typescript
import { applySnapshot, getSnapshot } from 'mobx-state-tree';

// Зберігати snapshot перед кожною зміною
const history: Snapshot[] = [];
history.push(getSnapshot(store));

// Undo
applySnapshot(store, history.pop());
```

---

### Q: Чому debounce, а не throttle?

**A:**
- **Debounce** — виконує після паузи (краще для введення тексту)
- **Throttle** — виконує з інтервалом (краще для scroll/resize)

Для форм debounce оптимальніший — зберігаємо тільки фінальний стан.

---

## Запуск проєкту

```bash
# Встановити залежності
npm install

# Запустити dev сервер
npm run dev

# Зібрати для продакшену
npm run build

# Запустити тести
npm run test

# Тести з coverage
npm run test:coverage

# Лінтинг
npm run lint

# TypeScript перевірка
npx tsc --noEmit
```

---

## Контакти

- **GitHub:** [ваш username]
- **LinkedIn:** [ваш профіль]
- **Email:** [ваш email]
