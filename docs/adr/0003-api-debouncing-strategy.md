# ADR-0003: Debouncing Strategy for API Calls

## Status
Accepted

## Context
User interactions (typing, dragging, style changes) trigger API calls. Without debouncing, rapid changes would cause excessive network requests, degrading performance and potentially overwhelming the server.

## Decision
Implement debounced API calls with a 300ms delay. All store mutations trigger `saveToServer()` which uses a debounced function to batch rapid changes into a single API call.

## Consequences

### Positive
- Reduces API call frequency by ~90% during rapid interactions
- Better performance and reduced server load
- Smooth user experience without lag
- Automatic batching of related changes

### Negative
- 300ms delay before final state is persisted
- Potential data loss if user navigates away immediately after changes
- Slightly more complex implementation

## Implementation Details
- Debounce utility function in `src/utils/debounce.ts`
- Each store instance has its own debounced save function
- 300ms delay chosen as balance between responsiveness and efficiency
- Immediate save on critical actions (delete, add) could be considered

## Alternatives Considered
- No debouncing (rejected - performance issues)
- Throttling (rejected - less efficient than debouncing for this use case)
- Optimistic updates with rollback (rejected - adds complexity, not needed for this scope)
