const BASE_URL = 'https://swapi.dev/api/planets';

export const getAllPlanets = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch planets from getAllPlanets function');
    }

    const data = await response.json(); // Convert body into JSON
    return data;
  } catch (error) {
    console.warn('Error fetching planets:', error);
    throw error;
  }
};
