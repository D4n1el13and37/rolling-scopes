import { useCallback, useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
  getPlanetBySearch,
  getPlanetsByPage,
  PlanetWithImage,
} from '../../api/apiMethods';
import Loader from '../../components/loader/Loader';
import Button from '../../components/ui-kit/Button';
import Headline from '../../components/headline/Headline';
import Content from '../../components/content/Content';

import './Home.css';

const Home = () => {
  const [planets, setPlanets] = useState<PlanetWithImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [throwError, setThrowError] = useState(false);
  const [query, setQuery] = useLocalStorage('query', '');

  const getPlanets = useCallback(async () => {
    setIsLoading(true);

    try {
      let response;
      if (query) {
        response = await getPlanetBySearch(query);
      } else {
        response = await getPlanetsByPage();
      }
      setPlanets(response);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching planets:', error);
      setIsLoading(false);
    }
  }, [query]);

  const handleThrowError = () => {
    setThrowError(true);
  };

  useEffect(() => {
    getPlanets();
  }, [getPlanets, query]);

  if (throwError) {
    throw new Error('Call an error by button');
  }

  return (
    <div className="app__wrapper">
      {isLoading && <Loader />}
      <div className="cause-error">
        <Button className="button-error" onClick={handleThrowError}>
          Throw Error
        </Button>
      </div>
      <Headline defaultQuery={query} setQuery={setQuery} />
      <Content planets={planets} />
    </div>
  );
};

export default Home;
