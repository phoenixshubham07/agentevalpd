import React, { lazy, Suspense } from 'react';

const WebGLErrorPage = lazy(() => import('./components/landing/WebGLErrorPage'));

function isWebGLError(error) {
  if (!error) return false;
  const msg = (error.message || error.toString()).toLowerCase();
  return (
    msg.includes('webgl') ||
    msg.includes('creating webgl context') ||
    msg.includes('webgl context') ||
    msg.includes('no webgl')
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, isWebGL: false, dismissed: false, error: null, errorInfo: null };
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      isWebGL: isWebGLError(error),
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error('Uncaught error:', error, errorInfo);
  }

  handleDismiss() {
    this.setState({ dismissed: true });
  }

  render() {
    const { hasError, isWebGL, dismissed, error, errorInfo } = this.state;

    if (hasError && isWebGL && !dismissed) {
      return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#020617' }} />}>
          <WebGLErrorPage onDismiss={this.handleDismiss} />
        </Suspense>
      );
    }

    if (hasError && !dismissed) {
      return (
        <div className="p-8 bg-red-900 text-white font-mono h-screen overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
          <details className="whitespace-pre-wrap">
            {error && error.toString()}
            <br />
            {errorInfo && errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
