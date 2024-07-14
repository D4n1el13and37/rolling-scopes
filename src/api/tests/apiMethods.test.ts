import { vi, describe, it, expect } from 'vitest';
import { fetchPlanets, getCurrentPlanet } from '../apiMethods';
import { mockPlanetsData, mockPlanetData } from './mockData';

globalThis.fetch = vi.fn();

describe('fetchPlanets function', () => {
  it('fetches planets and adds imageUrl', async () => {
    // Setting up fetch for ok
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => mockPlanetsData,
    });

    const data = await fetchPlanets();
    expect(data).toEqual(mockPlanetsData);
  });

  it('fetches planets with search query', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => mockPlanetsData,
    });

    const name = 'Tatooine';
    const data = await fetchPlanets(name);
    expect(data).toEqual(mockPlanetsData);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/planets/?search=Tatooine&page=1'
    );
  });

  it('fetches planets with pagination', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => mockPlanetsData,
    });

    const page = 2;
    const data = await fetchPlanets(undefined, page);
    expect(data).toEqual(mockPlanetsData);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/planets/?page=2'
    );
  });

  it('throws an error if fetch fails', async () => {
    // Setting up fetch with error
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
    });

    await expect(fetchPlanets()).rejects.toThrow(
      'Failed to fetch planets from fetchPlanets function'
    );
  });
});

describe('getCurrentPlanet function', () => {
  it('fetches a single planet and adds imageUrl', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => mockPlanetData,
    });

    const data = await getCurrentPlanet('1');
    expect(data).toEqual(mockPlanetData);
  });

  it('fetches planet with search query', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => mockPlanetsData,
    });

    const name = 'Tatooine';
    const data = await fetchPlanets(name);
    expect(data).toEqual(mockPlanetsData);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/planets/?search=Tatooine&page=1'
    );
  });

  it('throws an error if fetch fails', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
    });

    await expect(getCurrentPlanet('1')).rejects.toThrow();
  });
});
