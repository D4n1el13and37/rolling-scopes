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

  // it('landing to previus page', async () => {
  //   const user = userEvent.setup();

  //   await waitFor(() =>
  //     expect(screen.getByText(/Tatooine/i)).toBeInTheDocument()
  //   );

  //   await user.click(screen.getByText(/Tatooine/i));
  //   await waitFor(() =>
  //     expect(screen.getByText(/Rotation Period:/i)).toBeInTheDocument()
  //   );

  //   user.click(screen.getByTestId('planets-list'));
  //   await waitFor(() =>
  //     expect(screen.queryByText(/Rotation Period:/i)).not.toBeInTheDocument()
  //   );
  // });

  // it('render a page without any data', async () => {
  //   // await waitFor(() =>
  //   // globalThis.fetch = vi.fn();
  //   // render(
  //   //   <Provider store={testingStore}>
  //   //     <App />
  //   //   </Provider>
  //   // );
  //   expect(
  //     screen.getByText(/It seems that such a planet is not on our list/i)
  //   ).toBeInTheDocument();
  //   // );
  // });

  // it('render a page with pagination buttons, and check it`s work', async () => {
  //   (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
  //     ok: true,
  //     json: async () => paginationData,
  //   });
  //   render(<App />);

  //   const user = userEvent.setup();

  //   await waitFor(() =>
  //     expect(screen.getByText(/Page 1/i)).toBeInTheDocument()
  //   );
  //   await waitFor(() => expect(screen.getByText(/Prev/i)).toBeInTheDocument());
  //   await waitFor(() => expect(screen.getByText(/Next/i)).toBeInTheDocument());

  //   screen.debug();

  //   user.click(screen.getByText(/Next/i));
  //   await waitFor(() =>
  //     expect(screen.getByText(/Page 2/i)).toBeInTheDocument()
  //   );

  //   user.click(screen.getByText(/Prev/i));
  //   await waitFor(() =>
  //     expect(screen.getByText(/Page 1/i)).toBeInTheDocument()
  //   );
  // });

  // it('renders Loader when isLoading is true', () => {
  //   // Mock useState for isLoading state was true
  //   // vi.spyOn(React, 'useState').mockImplementationOnce(() => [true, vi.fn()]);
  //   vi.mock('../../api/apiMethods.useGetPlanetsQuery', () => ({
  //     useGetPlanetsQuery: vi.fn().mockReturnValue({
  //       data: mockPlanetsData,
  //       isFetching: true,
  //     }),
  //   }));

  //   render(<App />);

  //   expect(screen.getByTestId('loader')).toBeInTheDocument();
  // });
});
