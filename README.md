# Tagline Element Editor

Interactive editor for a Tagline element in a no-code website builder.

## Features

- **Preview Area** — Real-time preview of tagline with styled tags
- **Settings Panel** — Manage tags and customize appearance
- **Drag & Drop** — Reorder tags by dragging
- **Style Options** — 4 visual styles, 5 sizes, 5 radius values, 3 alignments
- **Panel Transitions** — Smooth slide animations between panels
- **Accessibility** — Full keyboard navigation, ARIA labels, focus management
- **Auto-save** — Debounced API calls with MobX reactions
- **ADRs** — Documented architectural decisions

## Tech Stack

- React 19 + TypeScript
- MobX for state management
- Styled Components for styling
- Framer Motion for animations
- @dnd-kit for drag & drop
- Vitest + Testing Library for unit tests

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

## Project Structure (Feature-Sliced Design)

```
src/
├── features/                    # Feature modules
│   └── tagline/                 # Tagline feature
│       ├── api/                 # API calls
│       │   └── taglineApi.ts
│       ├── components/          # Feature-specific components
│       │   ├── Panels/          # Settings panels
│       │   │   ├── MainPanel/
│       │   │   ├── ItemPanel/
│       │   │   ├── StylesPanel/
│       │   │   └── PanelContainer/
│       │   └── Preview/
│       ├── stores/
│       │   └── TaglineStore.ts
│       ├── styles/
│       │   └── TagStyleStrategy.ts
│       ├── types/
│       └── index.ts             # Public API (barrel)
│
├── components/                  # Shared UI components
│   ├── Tag/                     # Each component in folder
│   │   ├── Tag.tsx
│   │   ├── Tag.styles.ts
│   │   ├── Tag.test.tsx
│   │   └── index.ts
│   ├── TextInput/
│   ├── ButtonGroup/
│   ├── PanelHeader/
│   └── Icons/
│
├── stores/                      # Global stores
│   ├── PanelStore/
│   │   ├── PanelStore.ts
│   │   ├── PanelStore.test.ts
│   │   └── index.ts
│   └── RootStore/
│
├── types/                       # Base types
│   └── base/
│
├── utils/                       # Utilities
│   ├── debounce.ts
│   └── styleStrategy.ts
│
└── test/
    └── setup.ts

docs/
├── adr/                         # Architecture Decision Records
│   ├── 0001-feature-sliced-design.md
│   ├── 0002-mobx-state-management.md
│   ├── 0003-api-debouncing-strategy.md
│   ├── 0004-component-update-strategy.md
│   └── 0005-drag-and-drop-implementation.md
└── PROJECT_OVERVIEW_UA.md       # Detailed docs (Ukrainian)
```

## Architecture

### Feature-Sliced Design

Each feature is self-contained with its own:
- **api/** — API calls and data fetching
- **components/** — UI components used only by this feature
- **stores/** — State management
- **types/** — TypeScript interfaces
- **styles/** — Style strategies and variants
- **index.ts** — Public API (what other parts of the app can import)

### Design Patterns

1. **Observer Pattern** — MobX reactive state with `reaction()` for auto-save
2. **Strategy Pattern** — Style variants encapsulated for reuse
3. **Repository Pattern** — API layer abstraction
4. **Debouncing Pattern** — Optimized API call frequency

### Adding a New Feature

```bash
# Create feature structure
mkdir -p src/features/hero/{api,components,stores,types,styles}
```

```typescript
// src/features/hero/index.ts
export * from './types';
export { HeroStore } from './stores/HeroStore';
export { HeroPreview } from './components/Preview';
```

## Accessibility (a11y)

- All interactive elements have `aria-label` attributes
- `aria-pressed` for toggle buttons
- `role` attributes for semantic regions
- `:focus-visible` styles for keyboard navigation
- Form labels properly associated with inputs
- Drag handles with descriptive labels

## Testing

Unit tests cover:
- Store operations (add, update, remove, reorder)
- Component rendering
- User interactions

```bash
npm run test:run       # Run all tests
npm run test:coverage  # With coverage report
```

## API Simulation

Changes are logged to console as simulated API calls with debouncing:

```
POST http://api/tagline { items: [...], styles: {...} }
```

## Architecture Decisions

Key decisions are documented in [Architecture Decision Records (ADRs)](./docs/adr/README.md):

| ADR | Decision |
|-----|----------|
| [ADR-0001](./docs/adr/0001-feature-sliced-design.md) | Feature-Sliced Design architecture |
| [ADR-0002](./docs/adr/0002-mobx-state-management.md) | MobX for state management |
| [ADR-0003](./docs/adr/0003-api-debouncing-strategy.md) | Debouncing API calls (300ms) |
| [ADR-0004](./docs/adr/0004-component-update-strategy.md) | onBlur vs onChange strategy |
| [ADR-0005](./docs/adr/0005-drag-and-drop-implementation.md) | @dnd-kit for drag and drop |

## Path Aliases

The project uses TypeScript path aliases for clean imports:

```typescript
// Instead of
import { Tag } from '../../../../components/Tag';

// Use
import { Tag } from '@components';
```

| Alias | Path |
|-------|------|
| `@components` | `src/components` |
| `@stores` | `src/stores` |
| `@features/*` | `src/features/*` |
| `@utils/*` | `src/utils/*` |
| `@app/types/*` | `src/types/*` |
