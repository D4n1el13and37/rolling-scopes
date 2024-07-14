import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../../components/card/Card';
import { mockPlanetData } from '../mockData';

describe('routing tests', () => {
  it('render Card', async () => {
    render(<Card {...mockPlanetData} />);
    expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
    expect(screen.getByText(/Population: 200000/i)).toBeInTheDocument();
    expect(screen.getByText(/Climate: arid/i)).toBeInTheDocument();
    expect(screen.getByText(/Terrain: desert/i)).toBeInTheDocument();
  });

  it('render Card with image', async () => {
    render(<Card {...mockPlanetData} />);
    const img: HTMLImageElement = screen.getByTestId('card-image');
    expect(img.src).toContain(mockPlanetData.imageUrl);
    expect(img.alt).toBe(`${mockPlanetData.name} planet image`);
  });

  it('renders Card without image', () => {
    const mockDataWithoutImage = { ...mockPlanetData, imageUrl: '' };
    render(<Card {...mockDataWithoutImage} />);
    const img = screen.getByTestId('card-image');
    expect(img).toHaveAttribute('src', '');
    expect(img).toHaveAttribute(
      'alt',
      `${mockDataWithoutImage.name} planet image`
    );
  });
});
