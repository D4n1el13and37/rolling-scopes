import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Headline from '../../components/headline/Headline';

// Mock for useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Headline component tests', () => {
  beforeEach(() => {
    render(<Headline defaultQuery="" setQuery={() => {}} />);
  });

  it('updates searchQuery state on input change', async () => {
    const input = screen.getByPlaceholderText('Enter planet name');
    const user = userEvent.setup();
    user.type(input, 'Tatooine');
    await waitFor(() => expect(input).toHaveValue('Tatooine'));
  });
});
