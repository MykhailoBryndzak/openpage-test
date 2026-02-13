import { observer } from 'mobx-react-lite';
import { useTaglineStore } from '@stores';
import { Tag, ElementPreviewWrapper } from '@components';
import * as S from './TaglinePreview.styles';

export const TaglinePreview = observer(function TaglinePreview() {
  const store = useTaglineStore();
  const { items, styles } = store;

  return (
    <ElementPreviewWrapper elementType="tagline" ariaLabel="Tagline element">
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
    </ElementPreviewWrapper>
  );
});
