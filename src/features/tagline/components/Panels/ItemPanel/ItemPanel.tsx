import { useState, useEffect, useCallback } from 'react';
import type { TaglineStore } from '../../../stores/TaglineStore';
import { observer } from 'mobx-react-lite';
import { usePanelStore } from '@stores';
import { PanelHeader, TextInput, Button, PlusIcon, CheckIcon } from '@components';
import * as S from './ItemPanel.styles';

function validateUrl(value: string, required: boolean): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) {
    return required ? 'Link is required' : undefined;
  }
  try {
    new URL(trimmed);
    return undefined;
  } catch {
    return 'Enter a valid URL (e.g. https://example.com)';
  }
}

type ItemPanelProps = { store: TaglineStore; itemId?: string };

export const ItemPanel = observer(function ItemPanel({ store: taglineStore, itemId }: ItemPanelProps) {
  const panelStore = usePanelStore();
  const existingItem = itemId ? taglineStore.getItem(itemId) : undefined;
  const isEditing = Boolean(existingItem);

  const [label, setLabel] = useState(existingItem?.label ?? '');
  const [link, setLink] = useState(existingItem?.link ?? '');
  const [linkTouched, setLinkTouched] = useState(false);

  useEffect(() => {
    if (existingItem) {
      setLabel(existingItem.label);
      setLink(existingItem.link);
    } else {
      setLabel('');
      setLink('');
    }
    setLinkTouched(false);
  }, [existingItem]);

  const linkError = validateUrl(link, isEditing);
  const showLinkError = linkTouched && linkError;
  const isValid = !linkError && Boolean(label.trim());

  const hasChanges =
    isEditing &&
    existingItem &&
    (label.trim() !== existingItem.label || link.trim() !== existingItem.link);

  const handleSave = useCallback(() => {
    if (!existingItem || !isValid) return;
    taglineStore.updateItem(existingItem.id, {
      label: label.trim(),
      link: link.trim(),
    });
    panelStore.pop();
  }, [existingItem, isValid, label, link, taglineStore, panelStore]);

  const handleAddItem = useCallback(() => {
    if (!isValid) return;
    taglineStore.addItem(label.trim(), link.trim() || 'https://');
    panelStore.pop();
  }, [isValid, label, link, taglineStore, panelStore]);

  return (
    <S.Container role="form" aria-label={isEditing ? 'Edit tag' : 'Add new tag'}>
      <PanelHeader
        title={isEditing ? 'Edit Item' : 'New Item'}
        onBack={() => panelStore.pop()}
        onClose={() => panelStore.requestClose()}
      />

      <S.Content>
        <TextInput
          label="Label"
          value={label}
          onChange={setLabel}
          placeholder="Enter tag label"
        />
        <TextInput
          label="Link"
          value={link}
          onChange={setLink}
          onBlur={() => setLinkTouched(true)}
          placeholder="https://example.com"
          error={showLinkError ? linkError : undefined}
        />

        <S.ButtonRow>
          {isEditing ? (
            <Button
              variant="primary"
              icon={<CheckIcon />}
              onClick={handleSave}
              disabled={!isValid || !hasChanges}
              aria-label="Save changes"
            >
              Save
            </Button>
          ) : (
            <Button
              variant="primary"
              icon={<PlusIcon />}
              onClick={handleAddItem}
              disabled={!isValid}
              aria-label="Add item"
            >
              Add item
            </Button>
          )}
        </S.ButtonRow>
      </S.Content>
    </S.Container>
  );
});
