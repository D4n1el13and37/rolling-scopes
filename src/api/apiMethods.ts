import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Planet,
  PlanetsData,
  PlanetWithImage,
  UpdatedPlanetsData,
} from './types';
import planetsImages from './imagesGallery.json';

const planetsApi = createApi({
  reducerPath: 'planetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/planets' }),
  endpoints: (builder) => ({
    getCurrentPlanet: builder.query<PlanetWithImage, { id: string }>({
      query: ({ id }) => `/${id}`,
      transformResponse: (response: Planet) => {
        const imageUrl =
          planetsImages.find((planet) => planet.name === response.name)
            ?.imageUrl || '';
        return { ...response, imageUrl };
      },
    }),
    getPlanets: builder.query<
      UpdatedPlanetsData,
      { name?: string; page?: number }
    >({
      query: ({ name, page = 1 }) => {
        let searchQuery = `/?page=${page}`;
        if (name) {
          searchQuery = `/?search=${name}&page=${page}`;
        }
        return searchQuery;
      },
      transformResponse: (response: PlanetsData): UpdatedPlanetsData => {
        const updatedResult: PlanetWithImage[] = response.results.map(
          (planet) => {
            const image = planetsImages.filter(
              (el) => el?.name === planet.name
            )[0]?.imageUrl;
            return { ...planet, imageUrl: image };
          }
        );
        return { ...response, results: updatedResult };
      },
    }),
  }),
});

export default planetsApi;
