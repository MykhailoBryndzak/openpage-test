import type { ReactNode } from 'react';
import { useStores } from '@stores';
import { GearIcon } from '@components/Icons';
import type { ElementType } from '@core';
import * as S from './ElementPreviewWrapper.styles';

type ElementPreviewWrapperProps = {
  elementType: ElementType;
  ariaLabel: string;
  children: ReactNode;
};

export function ElementPreviewWrapper({ elementType, ariaLabel, children }: ElementPreviewWrapperProps) {
  const rootStore = useStores();

  const handleGearClick = () => {
    if (rootStore.panelStore.isOpen) {
      rootStore.panelStore.requestClose();
    } else {
      rootStore.openPanel(elementType);
    }
  };

  return (
    <S.Wrapper aria-label={ariaLabel}>
      <S.GearButton
        onClick={handleGearClick}
        data-panel-trigger
        aria-label={`Open ${ariaLabel} settings`}
        type="button"
      >
        <GearIcon />
      </S.GearButton>
      {children}
    </S.Wrapper>
  );
}
