import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { mockPlanetsData, paginationData } from './mockData';
import App from '../App';
import React from 'react';

globalThis.fetch = vi.fn(); // Mock fetch

describe('routing tests', () => {
  beforeEach(() => {
    // Setting up mock for fetch
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => mockPlanetsData,
    });

    render(<App />);
  });

  it('full app rendering/navigating', () => {
    expect(
      screen.getByText(/Star Wars Planets Collection/i)
    ).toBeInTheDocument();
  });

  it('landing on a bad page and go back', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText(/Throw Error/i));
    expect(screen.getByText(/we've lost our way/i)).toBeInTheDocument();

    await user.click(screen.getByText(/Return on the way/i));
    expect(
      screen.getByText(/Star Wars Planets Collection/i)
    ).toBeInTheDocument();
  });

  it('landing on detailed card page', async () => {
    const user = userEvent.setup();

    await waitFor(() =>
      expect(screen.getByText(/Tatooine/i)).toBeInTheDocument()
    );

    await user.click(screen.getByText(/Tatooine/i));
    await waitFor(() =>
      expect(screen.getByText(/Rotation Period:/i)).toBeInTheDocument()
    );
  });

  it('landing to previus page', async () => {
    const user = userEvent.setup();

    await waitFor(() =>
      expect(screen.getByText(/Tatooine/i)).toBeInTheDocument()
    );

    await user.click(screen.getByText(/Tatooine/i));
    await waitFor(() =>
      expect(screen.getByText(/Rotation Period:/i)).toBeInTheDocument()
    );

    user.click(screen.getByTestId('planets-list'));
    await waitFor(() =>
      expect(screen.queryByText(/Rotation Period:/i)).not.toBeInTheDocument()
    );
  });

  it('render a page without any data', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => '',
    });
    render(<App />);

    await waitFor(() =>
      expect(
        screen.getByText(/It seems that such a planet is not on our list/i)
      ).toBeInTheDocument()
    );
  });

  it('render a page with pagination buttons, and check it`s work', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => paginationData,
    });
    render(<App />);

    const user = userEvent.setup();

    await waitFor(() =>
      expect(screen.getByText(/Page 1/i)).toBeInTheDocument()
    );
    await waitFor(() => expect(screen.getByText(/Prev/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Next/i)).toBeInTheDocument());

    screen.debug();

    user.click(screen.getByText(/Next/i));
    await waitFor(() =>
      expect(screen.getByText(/Page 2/i)).toBeInTheDocument()
    );

    user.click(screen.getByText(/Prev/i));
    await waitFor(() =>
      expect(screen.getByText(/Page 1/i)).toBeInTheDocument()
    );
  });

  it('renders Loader when isLoading is true', () => {
    // Mock useState for isLoading state was true
    vi.spyOn(React, 'useState').mockImplementationOnce(() => [true, vi.fn()]);

    render(<App />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
