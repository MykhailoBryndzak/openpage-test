import { observer } from 'mobx-react-lite';
import { useTaglineStore, usePanelStore } from '@stores';
import { PanelHeader, PlusIcon, ChevronRightIcon, TagIcon } from '@components';
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

export const MainPanel = observer(function MainPanel() {
  const taglineStore = useTaglineStore();
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

  return (
    <S.Container role="region" aria-label="Tagline settings">
      <PanelHeader title="Tagline" onClose={() => panelStore.close()} />

      <S.Content>
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
            <TagIcon />
            <span>Styles</span>
          </S.StylesButtonLeft>
          <ChevronRightIcon />
        </S.StylesButton>
      </S.Footer>
    </S.Container>
  );
});
