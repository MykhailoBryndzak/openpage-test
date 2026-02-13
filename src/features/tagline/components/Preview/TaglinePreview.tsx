import { observer } from 'mobx-react-lite';
import { useTaglineStore, useStores } from '@stores';
import { Tag, GearIcon } from '@components';
import * as S from './TaglinePreview.styles';

export const TaglinePreview = observer(function TaglinePreview() {
  const store = useTaglineStore();
  const rootStore = useStores();
  const { items, styles } = store;

  const handleGearClick = () => {
    if (rootStore.panelStore.isOpen) {
      rootStore.panelStore.requestClose();
    } else {
      rootStore.openPanel('tagline');
    }
  };

  return (
    <S.PreviewWrapper aria-label="Tagline preview">
      <S.GearButton
        onClick={handleGearClick}
        data-panel-trigger
        aria-label="Open tagline settings"
        type="button"
      >
        <GearIcon />
      </S.GearButton>
      <S.Container>
        <S.Heading>Tagline element</S.Heading>
        <S.TagsContainer $alignment={styles.alignment} role="list" aria-label="Tags">
          {items.map((item) => (
            <Tag
              key={item.id}
              label={item.label}
              tagStyle={styles.style}
              size={styles.size}
              radius={styles.radius}
            />
          ))}
        </S.TagsContainer>
      </S.Container>
    </S.PreviewWrapper>
  );
});
