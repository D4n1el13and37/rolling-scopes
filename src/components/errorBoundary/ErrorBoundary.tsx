import { Component, ErrorInfo, ReactNode } from 'react';
import Button from '../ui-kit/Button';

import './ErrorBoundary.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, info);
  }

  handleErrorOff() {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="app__error_wrapper">
          <h1 className="app__error_title">Seems we've lost our way</h1>
          <Button
            className="app__error_button"
            onClick={() => this.handleErrorOff()}
          >
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
