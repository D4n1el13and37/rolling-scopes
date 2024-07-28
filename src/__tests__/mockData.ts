// import { configureStore } from '@reduxjs/toolkit';
// import planetsApi from '../api/apiMethods';
// import planetSlice from '../store/slices/planetsSliice';

export const mockPlanetsData = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      climate: 'arid',
      created: '2014-12-09T13:50:49.641000Z',
      diameter: '10465',
      edited: '2014-12-20T20:58:18.411000Z',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/4/',
        'https://swapi.dev/api/films/5/',
        'https://swapi.dev/api/films/6/',
      ],
      gravity: '1 standard',
      imageUrl: 'https://i.imgur.com/LVaGoXa.png',
      name: 'Tatooine',
      orbital_period: '304',
      population: '200000',
      residents: [
        'https://swapi.dev/api/people/1/',
        'https://swapi.dev/api/people/2/',
        'https://swapi.dev/api/people/4/',
        'https://swapi.dev/api/people/6/',
        'https://swapi.dev/api/people/7/',
        'https://swapi.dev/api/people/8/',
        'https://swapi.dev/api/people/9/',
        'https://swapi.dev/api/people/11/',
        'https://swapi.dev/api/people/43/',
        'https://swapi.dev/api/people/62/',
      ],
      rotation_period: '23',
      surface_water: '1',
      terrain: 'desert',
      url: 'https://swapi.dev/api/planets/1/',
    },
  ],
};

export const mockPlanetData = {
  climate: 'arid',
  created: '2014-12-09T13:50:49.641000Z',
  diameter: '10465',
  edited: '2014-12-20T20:58:18.411000Z',
  films: [
    'https://swapi.dev/api/films/1/',
    'https://swapi.dev/api/films/3/',
    'https://swapi.dev/api/films/4/',
    'https://swapi.dev/api/films/5/',
    'https://swapi.dev/api/films/6/',
  ],
  gravity: '1 standard',
  imageUrl: 'https://i.imgur.com/LVaGoXa.png',
  name: 'Tatooine',
  orbital_period: '304',
  population: '200000',
  residents: [
    'https://swapi.dev/api/people/1/',
    'https://swapi.dev/api/people/2/',
    'https://swapi.dev/api/people/4/',
    'https://swapi.dev/api/people/6/',
    'https://swapi.dev/api/people/7/',
    'https://swapi.dev/api/people/8/',
    'https://swapi.dev/api/people/9/',
    'https://swapi.dev/api/people/11/',
    'https://swapi.dev/api/people/43/',
    'https://swapi.dev/api/people/62/',
  ],
  rotation_period: '23',
  surface_water: '1',
  terrain: 'desert',
  url: 'https://swapi.dev/api/planets/1/',
};

export const paginationData = {
  count: 1,
  next: 'https://swapi.dev/api/planets/?page=3',
  previous: 'https://swapi.dev/api/planets/?page=1',
  results: [],
};
