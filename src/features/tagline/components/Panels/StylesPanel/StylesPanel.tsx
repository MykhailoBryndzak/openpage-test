import type { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { useTaglineStore, usePanelStore } from '@stores';
import { PanelHeader, ButtonGroup, AlignLeftIcon, AlignCenterIcon, AlignRightIcon } from '@components';
import { TAG_STYLES, TAG_SIZES, TAG_RADII } from '../../../types';
import type { TagStyle, TagSize, TagRadius, TagAlignment } from '../../../types';
import * as S from './StylesPanel.styles';

export const StylesPanel = observer(function StylesPanel() {
  const taglineStore = useTaglineStore();
  const panelStore = usePanelStore();

  const alignmentOptions: Array<{ value: TagAlignment; label: ReactNode }> = [
    { value: 'left', label: <AlignLeftIcon /> },
    { value: 'center', label: <AlignCenterIcon /> },
    { value: 'right', label: <AlignRightIcon /> },
  ];

  return (
    <S.Container role="form" aria-label="Tag styles settings">
      <PanelHeader title="Styles" onBack={() => panelStore.pop()} />

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
          <S.SizeButtonsContainer role="radiogroup" aria-label="Tag size">
            {TAG_SIZES.map((size: TagSize) => (
              <S.SizeButton
                key={size}
                $sizeValue={size}
                $active={taglineStore.styles.size === size}
                onClick={() => taglineStore.updateStyles({ size })}
                aria-pressed={taglineStore.styles.size === size}
                aria-label={`Size ${size}`}
                type="button"
              >
                {size}
              </S.SizeButton>
            ))}
          </S.SizeButtonsContainer>
        </S.Section>

        <S.Section>
          <S.SectionLabel>Radius</S.SectionLabel>
          <S.RadiusButtonsContainer role="radiogroup" aria-label="Corner radius">
            {TAG_RADII.map((radius: TagRadius) => (
              <S.RadiusButton
                key={radius}
                $radius={radius}
                $active={taglineStore.styles.radius === radius}
                onClick={() => taglineStore.updateStyles({ radius })}
                aria-pressed={taglineStore.styles.radius === radius}
                aria-label={`Radius ${radius === 100 ? 'full' : radius + 'px'}`}
                type="button"
              >
                {radius === 100 ? '∞' : radius}
              </S.RadiusButton>
            ))}
          </S.RadiusButtonsContainer>
        </S.Section>

        <S.Section>
          <S.SectionLabel>Alignment</S.SectionLabel>
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
