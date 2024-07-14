import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailedPlanet from '../../pages/DetailedPlanet/DetailedPlanet';
import { getCurrentPlanet } from '../../api/apiMethods';
import { mockPlanetData } from '../mockData';

// functions mock
const mockSetIsLoading = vi.fn();
const mockLocation = vi.fn();
const useParams = vi.fn();
const Link = vi.fn();
vi.mock('../../api/apiMethods', () => ({
  getCurrentPlanet: vi.fn(),
}));
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useLocation: () => mockLocation,
  useParams: () => useParams,
  Link: () => Link,
}));

describe('DetailedPlanet component tests', () => {
  beforeEach(() => {
    // Reset mocks and render the component
    (getCurrentPlanet as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockPlanetData
    );
    render(<DetailedPlanet setIsLoading={mockSetIsLoading} />);
  });

  it('displays planet details after loading', async () => {
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
