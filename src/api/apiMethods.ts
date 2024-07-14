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

export interface UpdatedPlanetsData extends PlanetsData {
  results: PlanetWithImage[];
}

const baseUrl = 'https://swapi.dev/api/planets';

export const fetchPlanets = async (
  name?: string,
  page = 1
): Promise<UpdatedPlanetsData> => {
  let searchQuery;
  if (name) {
    searchQuery = `/?search=${name}&page=${page}`;
  } else {
    searchQuery = `/?page=${page}`;
  }

  try {
    const url = baseUrl + searchQuery;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch planets from fetchPlanets function');
    }

    const data: PlanetsData = await response.json();

    const updatedResult: PlanetWithImage[] = data.results.map((planet) => {
      const image =
        planetsImages.filter((el) => el?.name === planet.name)[0]?.imageUrl ||
        '';
      return { ...planet, imageUrl: image };
    });
    const updatedData = { ...data, results: updatedResult };
    return updatedData;
  } catch (error) {
    console.warn('Error fetching planets:', error);
    throw error;
  }
};

export const getCurrentPlanet = async (
  id: string
): Promise<PlanetWithImage> => {
  try {
    const url = baseUrl + `/${id}`;
    const response = await fetch(url);
    const data: Planet = await response.json();
    const imageUrl = planetsImages.filter(
      (planet) => planet.name === data.name
    )[0].imageUrl;
    const updatedData = { ...data, imageUrl: imageUrl };
    return updatedData;
  } catch (error) {
    console.warn('Error fetching planets:', error);
    throw error;
  }
};
