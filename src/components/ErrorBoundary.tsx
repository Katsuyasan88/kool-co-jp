import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean };

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center pt-32 pb-20">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-4">ページの表示中に問題が発生しました</h1>
          <p className="text-text-muted mb-8">
            お手数ですが、ページを再読み込みしてください。改善しない場合は時間をおいて再度お試しください。
          </p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            再読み込みする
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
