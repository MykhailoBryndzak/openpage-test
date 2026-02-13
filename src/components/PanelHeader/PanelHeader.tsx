import { memo } from 'react';
import { ChevronLeftIcon, XIcon } from '@components/Icons';
import * as S from './PanelHeader.styles';

type PanelHeaderProps = {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
};

export const PanelHeader = memo(function PanelHeader({ title, onBack, onClose }: PanelHeaderProps) {
  return (
    <S.Header>
      <S.LeftSection>
        {onBack && (
          <S.IconButton
            onClick={onBack}
            aria-label="Go back"
            type="button"
          >
            <ChevronLeftIcon />
          </S.IconButton>
        )}
      </S.LeftSection>
      <S.CenterSection>
        <S.Title>{title}</S.Title>
      </S.CenterSection>
      <S.RightSection>
        <S.IconButton
          onClick={onClose}
          aria-label="Close panel"
          type="button"
          disabled={!onClose}
        >
          <XIcon />
        </S.IconButton>
      </S.RightSection>
    </S.Header>
  );
});
