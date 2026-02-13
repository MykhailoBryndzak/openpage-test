import type { ReactNode } from 'react';
import { Component } from 'react';
import * as S from './ErrorBoundary.styles';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <S.Container role="alert" aria-live="assertive">
          <S.Heading>Something went wrong</S.Heading>
          <S.Message>{this.state.error.message}</S.Message>
          <S.RetryButton
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            aria-label="Try again"
          >
            Try again
          </S.RetryButton>
        </S.Container>
      );
    }
    return this.props.children;
  }
}
