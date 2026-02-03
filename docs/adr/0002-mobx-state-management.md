# ADR-0002: MobX for State Management

## Status
Accepted

## Context
The application requires reactive state management for real-time UI updates. Multiple stores need to coordinate (TaglineStore, PanelStore) and state changes should trigger automatic re-renders.

## Decision
Use MobX with `makeAutoObservable` for state management. Stores are composed in a RootStore and accessed via React Context.

## Consequences

### Positive
- Minimal boilerplate compared to Redux
- Automatic reactivity - components re-render when observed state changes
- Simple API for mutations
- Good TypeScript support
- Works well with feature-sliced design

### Negative
- Less explicit than Redux (can make debugging harder)
- Requires `observer` HOC for React components
- Learning curve for developers unfamiliar with MobX

## Implementation Details
- Stores use `makeAutoObservable` for automatic observability
- Mutations wrapped in `runInAction` for batch updates
- React components wrapped with `observer` from `mobx-react-lite`
- Custom hooks (`useTaglineStore`, `usePanelStore`) provide type-safe access

## Alternatives Considered
- Redux Toolkit (rejected - more boilerplate, overkill for this scope)
- Zustand (rejected - less mature ecosystem)
- React Context + useState (rejected - poor performance with frequent updates)
