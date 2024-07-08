import planetsImages from './imagesGallery.json';

interface Planet {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];

  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}

export interface PlanetWithImage extends Planet {
  imageUrl: string;
}

interface PlanetsData {
  count: number;
  next: null | string;
  previous: null | string;
  results: Planet[];
}

const baseUrl = 'https://swapi.dev/api/planets';

const fetchPlanets = async (query: string): Promise<PlanetWithImage[]> => {
  try {
    const url = baseUrl + query;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch planets from fetchPlanets function');
    }

    const data: PlanetsData = await response.json();

    const updatedData: PlanetWithImage[] = data.results.map((planet) => {
      const image =
        planetsImages.filter((el) => el?.name === planet.name)[0]?.imageUrl ||
        '';
      return { ...planet, imageUrl: image };
    });

    return updatedData;
  } catch (error) {
    console.warn('Error fetching planets:', error);
    throw error;
  }
};

export const getPlanetsByPage = async (
  page = 1
): Promise<PlanetWithImage[]> => {
  const pageQuery = `/?page=${page}`;
  return fetchPlanets(pageQuery);
};

export const getPlanetBySearch = async (
  name: string
): Promise<PlanetWithImage[]> => {
  const searchQuery = `/?search=${name}`;
  return fetchPlanets(searchQuery);
};
