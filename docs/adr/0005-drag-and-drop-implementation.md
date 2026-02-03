# ADR-0005: Drag and Drop Implementation

## Status
Accepted

## Context
Users need to reorder tag items. Drag and drop provides the most intuitive interaction pattern for list reordering.

## Decision
Use `@dnd-kit` library with `SortableContext` for drag and drop functionality. Store mutations use the `reorderItems()` method to maintain consistency with other store operations.

## Consequences

### Positive
- Accessible - supports keyboard navigation
- Lightweight and performant
- Good TypeScript support
- Consistent with store API - uses `reorderItems()` method

### Negative
- Additional dependency
- Requires proper sensor configuration for touch/keyboard support

## Implementation Details
- `DndContext` with `closestCenter` collision detection
- `SortableContext` with `verticalListSortingStrategy`
- `PointerSensor` and `KeyboardSensor` for input methods
- Drag end handler calls `taglineStore.reorderItems()` instead of direct mutation
- Visual feedback during drag (opacity change)

## Alternatives Considered
- HTML5 drag and drop API (rejected - poor accessibility, inconsistent behavior)
- Manual click-and-drag implementation (rejected - too much code, accessibility concerns)
- Up/down arrow buttons (rejected - less intuitive, slower for large lists)
