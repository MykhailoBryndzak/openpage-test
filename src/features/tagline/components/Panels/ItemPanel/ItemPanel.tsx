import { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useTaglineStore, usePanelStore } from '@stores';
import { PanelHeader, TextInput, PlusIcon } from '@components';
import * as S from './ItemPanel.styles';

export const ItemPanel = observer(function ItemPanel() {
  const taglineStore = useTaglineStore();
  const panelStore = usePanelStore();
  const itemId = panelStore.current.itemId;

  const existingItem = itemId ? taglineStore.getItem(itemId) : undefined;
  const isEditing = Boolean(existingItem);

  const [label, setLabel] = useState(existingItem?.label ?? '');
  const [link, setLink] = useState(existingItem?.link ?? '');

  useEffect(() => {
    if (existingItem) {
      setLabel(existingItem.label);
      setLink(existingItem.link);
    } else {
      setLabel('');
      setLink('');
    }
  }, [existingItem]);

  const handleLabelBlur = useCallback(() => {
    if (isEditing && existingItem && label !== existingItem.label) {
      taglineStore.updateItem(existingItem.id, { label: label.trim() });
    }
  }, [isEditing, existingItem, label, taglineStore]);

  const handleLinkBlur = useCallback(() => {
    if (isEditing && existingItem && link !== existingItem.link) {
      taglineStore.updateItem(existingItem.id, { link: link.trim() });
    }
  }, [isEditing, existingItem, link, taglineStore]);

  function handleAddItem() {
    if (label.trim()) {
      taglineStore.addItem(label.trim(), link.trim() || 'https://');
      panelStore.pop();
    }
  }

  return (
    <S.Container role="form" aria-label={isEditing ? 'Edit tag' : 'Add new tag'}>
      <PanelHeader
        title={isEditing ? 'Edit Item' : 'New Item'}
        onBack={() => panelStore.pop()}
      />

      <S.Content>
        <TextInput
          label="Label"
          value={label}
          onChange={setLabel}
          onBlur={handleLabelBlur}
          placeholder="Enter tag label"
        />
        <TextInput
          label="Link"
          value={link}
          onChange={setLink}
          onBlur={handleLinkBlur}
          placeholder="https://example.com"
        />

        {!isEditing && (
          <S.AddButton
            onClick={handleAddItem}
            disabled={!label.trim()}
            aria-label="Add item"
            type="button"
          >
            <PlusIcon />
            <span>Add item</span>
          </S.AddButton>
        )}
      </S.Content>
    </S.Container>
  );
});
