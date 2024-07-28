import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import planetsApi from '../../api/apiMethods';
import Button from '../../components/ui-kit/Button';
import Headline from '../../components/headline/Headline';
import Content from '../../components/content/Content';
import Pagination from '../../components/pagination/Pagination';

import './Home.css';
import { useSearchParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';

const Home: React.FC = () => {
  const [query, setQuery] = useLocalStorage('query', '');

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search') || query;

  const { data, isFetching } = planetsApi.useGetPlanetsQuery({
    page,
    name: searchQuery,
  });

  const [throwError, setThrowError] = useState(false);

  const handleThrowError = () => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error('Call an error by button');
  }

  return (
    <>
      {isFetching && <Loader />}
      <div className="app__wrapper">
        <div className="cause-error">
          <Button className="button-error" onClick={handleThrowError}>
            Throw Error
          </Button>
        </div>

        <Headline defaultQuery={query} setQuery={setQuery} />
        <Content planets={data?.results} />
        {(data?.next || data?.previous) && (
          <Pagination next={data?.next} previous={data?.previous} />
        )}
      </div>
    </>
  );
};

export default Home;
