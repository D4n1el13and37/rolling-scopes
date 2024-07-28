import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlanetWithImage } from '../../api/types';

export interface ChoosenPlanetsState {
  choosenPlanets: PlanetWithImage[];
}

const initialState: ChoosenPlanetsState = {
  choosenPlanets: [],
};

const planetSlice = createSlice({
  initialState: initialState,
  name: 'tookPlanets',
  reducers: {
    addPlanetIntoArray: (state, action: PayloadAction<PlanetWithImage>) => {
      state.choosenPlanets.push(action.payload);
    },
    removeChoosenPlanet: (state, action: PayloadAction<PlanetWithImage>) => {
      const filtered = state.choosenPlanets.filter(
        (planet) => planet.name !== action.payload.name
      );
      state.choosenPlanets = filtered;
    },
    removeAllPlanets: (state) => {
      state.choosenPlanets = [];
    },
  },
});

export const { addPlanetIntoArray, removeChoosenPlanet, removeAllPlanets } =
  planetSlice.actions;
export default planetSlice;
