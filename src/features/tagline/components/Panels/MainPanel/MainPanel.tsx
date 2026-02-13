import type { TaglineStore } from '../../../stores/TaglineStore';
import { observer } from 'mobx-react-lite';
import { usePanelStore } from '@stores';
import { SAVE_ERROR_MESSAGES } from '../../../api/taglineApi';
import { PanelHeader, PlusIcon, ChevronRightIcon, StyleIcon } from '@components';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import * as S from './MainPanel.styles';
import { SortableTagItem } from './SortableTagItem';

type MainPanelProps = { store: TaglineStore };

export const MainPanel = observer(function MainPanel({ store: taglineStore }: MainPanelProps) {
  const panelStore = usePanelStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = taglineStore.items.findIndex((i) => i.id === active.id);
      const newIndex = taglineStore.items.findIndex((i) => i.id === over.id);
      taglineStore.reorderItems(oldIndex, newIndex);
    }
  }

  const hasItems = taglineStore.items.length > 0;

  return (
    <S.Container role="region" aria-label="Tagline settings">
      <PanelHeader title="Tagline" onClose={() => panelStore.requestClose()} />

      {taglineStore.saveError && (
        <S.SaveErrorBanner role="alert">
          {SAVE_ERROR_MESSAGES[taglineStore.saveError]}
        </S.SaveErrorBanner>
      )}

      <S.Content>
        {hasItems ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={taglineStore.items.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              <S.TagList aria-label="Tag items">
                {taglineStore.items.map((item) => (
                  <SortableTagItem
                    key={item.id}
                    item={item}
                    onEdit={() => panelStore.openItemPanel(item.id)}
                    onRemove={() => taglineStore.removeItem(item.id)}
                  />
                ))}
              </S.TagList>
            </SortableContext>
          </DndContext>
        ) : (
          <S.EmptyState>
            <span>No tags yet</span>
          </S.EmptyState>
        )}

        <S.AddButton
          onClick={() => panelStore.openItemPanel()}
          aria-label="Add new tag"
          type="button"
        >
          <PlusIcon />
          <span>Add item</span>
        </S.AddButton>
      </S.Content>

      <S.Footer>
        <S.StylesButton
          onClick={() => panelStore.openStylesPanel()}
          aria-label="Open styles settings"
          type="button"
        >
          <S.StylesButtonLeft>
            <StyleIcon />
            <span>Styles</span>
          </S.StylesButtonLeft>
          <ChevronRightIcon />
        </S.StylesButton>
      </S.Footer>
    </S.Container>
  );
});
