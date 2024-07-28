import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary';
import userEvent from '@testing-library/user-event';

const ChildComponentWithError = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary component tests', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders error message and button when error occurs', () => {
    const user = userEvent.setup();

    vi.spyOn(ErrorBoundary.prototype, 'componentDidCatch');

    // Render ErrorBoundary with child that throws an error
    render(
      <ErrorBoundary>
        <ChildComponentWithError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Seems we've lost our way/i)).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();

    user.click(screen.getByText(/Try again/i));
    expect(ErrorBoundary.prototype.componentDidCatch).toHaveBeenCalledTimes(1);
  });
});
