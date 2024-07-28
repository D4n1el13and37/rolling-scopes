import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalFlyout from '../../components/ModalFlyout/ModalFlyout';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import planetsSlice from '../../store/slices/planetsSliice';
import useAppSelector from '../../hooks/useAppSelector';

vi.mock('../../hooks/useAppSelector', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('../../hooks/useAppDispatch', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('ModalFlyout component', () => {
  const mockStore = configureStore({
    reducer: {
      planets: planetsSlice.reducer,
    },
  });

  it('displays the correct number of selected items', () => {
    mockStore.dispatch({
      type: 'planets/setChoosenPlanets',
      payload: [
        { id: 1, name: 'Tatooine' },
        { id: 2, name: 'Hoth' },
      ],
    });

    vi.mocked(useAppSelector).mockReturnValue({
      choosenPlanets: [
        { id: 1, name: 'Tatooine' },
        { id: 2, name: 'Hoth' },
      ],
    });

    render(
      <Provider store={mockStore}>
        <ModalFlyout />
      </Provider>
    );

    expect(screen.getByText(/2 items selected/i)).toBeInTheDocument();
  });
});
