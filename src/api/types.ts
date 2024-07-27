export interface Planet {
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

export interface PlanetsData {
  count: number;
  next: null | string;
  previous: null | string;
  results: Planet[];
}

export interface UpdatedPlanetsData extends PlanetsData {
  results: PlanetWithImage[];
}
