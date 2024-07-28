import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { mockPlanetData, mockPlanetsData } from './mockData';
import App from '../App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import planetsApi from '../api/apiMethods';
import planetSlice from '../store/slices/planetsSliice';

vi.mock('../../api/apiMethods.useGetCurrentPlanetQuery', () => ({
  useGetCurrentPlanetQuery: vi.fn(),
}));

vi.mock('../../api/apiMethods.useGetPlanetsQuery', () => ({
  useGetPlanetsQuery: vi.fn(),
}));

const testingStore = configureStore({
  reducer: {
    [planetsApi.reducerPath]: planetsApi.reducer,
    planets: planetSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(planetsApi.middleware),
});

describe('routing tests', () => {
  beforeEach(() => {
    vi.mock('../../api/apiMethods.useGetCurrentPlanetQuery', () => ({
      useGetCurrentPlanetQuery: vi.fn().mockReturnValue({
        data: mockPlanetData,
        isFetching: false,
      }),
    }));

    vi.mock('../../api/apiMethods.useGetPlanetsQuery', () => ({
      useGetPlanetsQuery: vi.fn().mockReturnValue({
        data: mockPlanetsData,
        isFetching: false,
      }),
    }));

    render(
      <Provider store={testingStore}>
        <App />
      </Provider>
    );
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
    screen.debug();
    await waitFor(() =>
      expect(screen.getByText(/Rotation Period:/i)).toBeInTheDocument()
    );
  });
});
