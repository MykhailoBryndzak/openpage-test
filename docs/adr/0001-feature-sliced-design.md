# ADR-0001: Feature-Sliced Design Architecture

## Status
Accepted

## Context
The project requires a scalable architecture that supports multiple element types (tagline, hero, etc.) in a no-code website builder. Each element type needs its own state management, UI components, API integration, and styling strategies.

## Decision
Adopt Feature-Sliced Design (FSD) architecture pattern where each feature is self-contained with its own:
- `api/` - API calls and data fetching
- `components/` - Feature-specific UI components
- `stores/` - State management (MobX stores)
- `types/` - TypeScript interfaces
- `styles/` - Style strategies and variants
- `index.ts` - Public API (barrel exports)

## Consequences

### Positive
- Clear separation of concerns
- Features are independently testable
- Easy to add new element types
- Reduced coupling between features
- Clear public API boundaries

### Negative
- Slight overhead for small features
- Requires discipline to maintain boundaries
- More files to navigate initially

## Alternatives Considered
- Monolithic component structure (rejected - poor scalability)
- Domain-driven design (rejected - overkill for this scope)
- Atomic design (rejected - focuses on component hierarchy, not feature organization)
