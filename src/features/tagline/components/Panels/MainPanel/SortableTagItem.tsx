import { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon, XIcon } from '@components';
import type { TagItem } from '../../../types';
import * as S from './MainPanel.styles';

type SortableTagItemProps = {
  item: TagItem;
  onEdit: () => void;
  onRemove: () => void;
};

export const SortableTagItem = memo(function SortableTagItem({ item, onEdit, onRemove }: SortableTagItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <S.TagItem ref={setNodeRef} style={style}>
      <S.DragHandle
        {...attributes}
        {...listeners}
        aria-label={`Drag to reorder ${item.label}`}
        type="button"
      >
        <GripVerticalIcon />
      </S.DragHandle>
      <S.TagLabel
        onClick={onEdit}
        aria-label={`Edit ${item.label}`}
        type="button"
      >
        {item.label}
      </S.TagLabel>
      <S.RemoveButton
        className="removeButton"
        onClick={onRemove}
        aria-label={`Remove ${item.label}`}
        type="button"
      >
        <XIcon />
      </S.RemoveButton>
    </S.TagItem>
  );
});
