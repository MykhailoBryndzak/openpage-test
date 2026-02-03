# ADR-0004: Component Update Strategy (onBlur vs onChange)

## Status
Accepted

## Context
Form inputs in ItemPanel need to update the store. Updating on every keystroke causes performance issues and excessive API calls, even with debouncing.

## Decision
Update store on `onBlur` events rather than `onChange` events. This provides immediate visual feedback (local state) while deferring persistence until the user finishes editing.

## Consequences

### Positive
- Better performance - no store updates during typing
- Fewer API calls - only saves when user finishes editing a field
- Better UX - no lag while typing
- Clearer intent - user signals completion by blurring field

### Negative
- Changes not persisted until blur (could be lost if user navigates away)
- Slightly different behavior than real-time updates
- Requires managing local state separately from store state

## Implementation Details
- Local state (`useState`) for immediate UI updates
- Store updates triggered on `onBlur` handlers
- Comparison with existing values to avoid unnecessary updates
- Immediate save on form submission (Add button)

## Alternatives Considered
- Update on every keystroke with debouncing (rejected - still too many updates)
- Update on Enter key (rejected - less intuitive)
- Update on form submit only (rejected - poor UX for editing existing items)
