import React, { useCallback, useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { fetchPlanets, PlanetWithImage } from '../../api/apiMethods';
import Button from '../../components/ui-kit/Button';
import Headline from '../../components/headline/Headline';
import Content from '../../components/content/Content';
import { useSearchParams } from 'react-router-dom';
import Pagination, {
  PaginationProps,
} from '../../components/pagination/Pagination';

import './Home.css';

export interface LoadingState {
  setIsLoading: (state: boolean) => void;
}

const Home: React.FC<LoadingState> = ({ setIsLoading }) => {
  const [planets, setPlanets] = useState<PlanetWithImage[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationProps>();
  const [throwError, setThrowError] = useState(false);
  const [query, setQuery] = useLocalStorage('query', '');

  const [searchParams] = useSearchParams();

  const getPlanets = useCallback(async () => {
    setIsLoading(true);

    try {
      const searchQuery = searchParams.get('search') || query;
      const page = Number(searchParams.get('page')) || 1;
      const response = await fetchPlanets(searchQuery, page);
      setPlanets(response.results);
      setPaginationData(response);
    } catch (error) {
      console.error('Error fetching planets:', error);
    } finally {
      setIsLoading(false);
    }
  }, [query, searchParams, setIsLoading]);

  const handleThrowError = () => {
    setThrowError(true);
  };

  useEffect(() => {
    getPlanets();
  }, [getPlanets, searchParams]);

  if (throwError) {
    throw new Error('Call an error by button');
  }

  return (
    <div className="app__wrapper">
      <div className="cause-error">
        <Button className="button-error" onClick={handleThrowError}>
          Throw Error
        </Button>
      </div>
      <Headline defaultQuery={query} setQuery={setQuery} />
      <Content planets={planets} />
      {(paginationData?.next || paginationData?.previous) && (
        <Pagination
          next={paginationData?.next}
          previous={paginationData?.previous}
        />
      )}
    </div>
  );
};

export default Home;
