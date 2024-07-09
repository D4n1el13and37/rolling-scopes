import { /* Component, */ useCallback, useEffect, useState } from 'react';
import Headline from './components/headline/Headline';
import Content from './components/content/Content';
import Loader from './components/loader/Loader';
import {
  getPlanetBySearch,
  getPlanetsByPage,
  PlanetWithImage,
} from './api/apiMethods';

import './app.css';

// interface AppState {
//   defaultQuery: string | null;
//   isLoading: boolean;
//   planets: PlanetWithImage[];
//   throwError: boolean;
// }

const App: React.FC = () => {
  const [appState, setAppState] = useState({
    defaultQuery: localStorage.getItem('query'), // should i change it into context?
    isLoading: false,
    planets: [] as PlanetWithImage[],
    throwError: false,
  });
  // const [isLoading, setIsLoading] = useState(false);
  // const [throwError, setThrowError] = useState(false);

  const getPlanets = useCallback(async () => {
    setAppState({
      ...appState,
      isLoading: true,
    });

    try {
      let response: PlanetWithImage[];
      if (appState.defaultQuery) {
        // if we got something in LS seatch by query
        response = await getPlanetBySearch(appState.defaultQuery!);
      } else {
        response = await getPlanetsByPage();
      }
      setAppState({ ...appState, planets: response, isLoading: false });
    } catch (error) {
      console.error('Error fetching planets:', error);
      setAppState({ ...appState, isLoading: false });
    }
  }, [appState]);

  const searchPlanets = async (planetName?: string) => {
    setAppState({
      ...appState,
      isLoading: true,
    });
    try {
      let response;
      if (planetName) {
        response = await getPlanetBySearch(planetName);
      } else {
        response = await getPlanetsByPage();
      }
      setAppState({ ...appState, planets: response, isLoading: false });
    } catch (error) {
      console.error('Error fetching planets by searching:', error);
      setAppState({ ...appState, isLoading: false });
    }
  };
  const handleThrowError = () => {
    console.log('is it work?');
    setAppState({ ...appState, throwError: true });
  };

  useEffect(() => {
    if (!appState.planets.length) {
      getPlanets();
    }
  }, [appState.planets, getPlanets]);

  return (
    //   if (this.state.throwError) {
    //   throw new Error('Call an error by button');
    // }

    <div className="app__wrapper">
      {appState.isLoading && <Loader />}
      <div className="cause-error">
        <button className="button-error" onClick={handleThrowError}>
          Throw Error
        </button>
      </div>
      <Headline onSearch={searchPlanets} />
      <Content planets={appState.planets} />
    </div>
  );
};

export default App;
