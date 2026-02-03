# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) documenting key architectural decisions made in this project.

## What are ADRs?

ADRs are documents that capture important architectural decisions along with their context and consequences. They help:
- Document why decisions were made
- Provide context for future developers
- Track the evolution of the architecture
- Avoid revisiting settled decisions

## ADR Index

- [ADR-0001: Feature-Sliced Design Architecture](./0001-feature-sliced-design.md)
- [ADR-0002: MobX for State Management](./0002-mobx-state-management.md)
- [ADR-0003: Debouncing Strategy for API Calls](./0003-api-debouncing-strategy.md)
- [ADR-0004: Component Update Strategy (onBlur vs onChange)](./0004-component-update-strategy.md)
- [ADR-0005: Drag and Drop Implementation](./0005-drag-and-drop-implementation.md)

## Format

Each ADR follows this structure:
- **Status**: Accepted/Proposed/Deprecated/Superseded
- **Context**: The situation and problem
- **Decision**: What was decided
- **Consequences**: Positive and negative impacts
- **Alternatives Considered**: Other options that were evaluated

## Adding New ADRs

When making a significant architectural decision:
1. Create a new file `000X-short-title.md`
2. Follow the template structure
3. Update this README with the new ADR
4. Keep ADRs concise and focused on one decision
