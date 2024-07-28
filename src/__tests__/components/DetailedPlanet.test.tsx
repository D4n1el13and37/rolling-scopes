import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockPlanetData } from '../mockData';
import DetailedPlanet from '../../pages/DetailedPlanet/DetailedPlanet';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import planetsApi from '../../api/apiMethods';
import planetSlice from '../../store/slices/planetsSliice';

vi.mock('react-router-dom', () => {
  const actual = vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({ search: '' }),
    useParams: () => ({ id: '1' }),
    Link: () => <div></div>,
  };
});

describe('DetailedPlanet component tests', () => {
  const testingStore = configureStore({
    reducer: {
      [planetsApi.reducerPath]: planetsApi.reducer,
      planets: planetSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(planetsApi.middleware),
  });

  vi.mock('../../api/apiMethods.useGetCurrentPlanetQuery', () => ({
    useGetCurrentPlanetQuery: vi.fn().mockReturnValue({
      data: mockPlanetData,
      isFetching: false,
    }),
  }));

  it('displays planet details after loading', async () => {
    render(
      <Provider store={testingStore}>
        <DetailedPlanet />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Tatooine')).toBeInTheDocument();
      expect(screen.getByText('Diameter: 10465km')).toBeInTheDocument();
      expect(screen.getByText('Rotation Period: 23 days')).toBeInTheDocument();
      expect(screen.getByText('Orbital Period: 304 days')).toBeInTheDocument();
      expect(screen.getByText('Gravity: 1 standard')).toBeInTheDocument();
      expect(screen.getByText('Population: 200000')).toBeInTheDocument();
      expect(screen.getByText('Climate: arid')).toBeInTheDocument();
      expect(screen.getByText('Terrain: desert')).toBeInTheDocument();
      expect(screen.getByText('Surface Water: 1%')).toBeInTheDocument();
    });
  });
});
