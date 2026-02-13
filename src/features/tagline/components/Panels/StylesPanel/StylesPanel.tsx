import type { ReactNode } from 'react';
import type { TaglineStore } from '../../../stores/TaglineStore';
import { observer } from 'mobx-react-lite';
import { usePanelStore } from '@stores';
import { PanelHeader, ButtonGroup, AlignLeftIcon, AlignCenterIcon, AlignRightIcon } from '@components';
import { TAG_STYLES, TAG_SIZES, TAG_RADII } from '../../../types';
import type { TagStyle, TagSize, TagRadius, TagAlignment } from '../../../types';
import * as S from './StylesPanel.styles';

type StylesPanelProps = { store: TaglineStore };

export const StylesPanel = observer(function StylesPanel({ store: taglineStore }: StylesPanelProps) {
  const panelStore = usePanelStore();

  const alignmentOptions: Array<{ value: TagAlignment; label: ReactNode }> = [
    { value: 'left', label: <AlignLeftIcon /> },
    { value: 'center', label: <AlignCenterIcon /> },
    { value: 'right', label: <AlignRightIcon /> },
  ];

  return (
    <S.Container role="form" aria-label="Tag styles settings">
      <PanelHeader
        title="Styles"
        onBack={() => panelStore.pop()}
        onClose={() => panelStore.requestClose()}
      />

      <S.Content>
        <S.Section>
          <S.SectionLabel>Style</S.SectionLabel>
          <S.StyleButtonsContainer role="radiogroup" aria-label="Tag style">
            {TAG_STYLES.map((style: TagStyle) => (
              <S.StyleButton
                key={style}
                $style={style}
                $active={taglineStore.styles.style === style}
                onClick={() => taglineStore.updateStyles({ style })}
                aria-pressed={taglineStore.styles.style === style}
                aria-label={`${style} style`}
                type="button"
              >
                Aa
              </S.StyleButton>
            ))}
          </S.StyleButtonsContainer>
        </S.Section>

        <S.Section>
          <S.SectionLabel>Size</S.SectionLabel>
          <ButtonGroup
            options={TAG_SIZES.map((s) => ({ value: s, label: s }))}
            value={taglineStore.styles.size}
            onChange={(size) => taglineStore.updateStyles({ size: size as TagSize })}
            ariaLabel="Tag size"
          />
        </S.Section>

        <S.Section>
          <S.SectionLabel>Radius</S.SectionLabel>
          <ButtonGroup
            options={TAG_RADII.map((r) => ({ value: r, label: r === 100 ? '100' : String(r) }))}
            value={taglineStore.styles.radius}
            onChange={(radius) => taglineStore.updateStyles({ radius: radius as TagRadius })}
            ariaLabel="Corner radius"
          />
        </S.Section>

        <S.Section>
          <ButtonGroup
            options={alignmentOptions}
            value={taglineStore.styles.alignment}
            onChange={(alignment) => taglineStore.updateStyles({ alignment: alignment as TagAlignment })}
            size="sm"
            ariaLabel="Tag alignment"
          />
        </S.Section>
      </S.Content>
    </S.Container>
  );
});
