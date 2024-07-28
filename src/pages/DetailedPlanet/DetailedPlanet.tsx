import { Link, useLocation, useParams } from 'react-router-dom';
import Button from '../../components/ui-kit/Button';

import './DetailedPlanet.css';
import planetsApi from '../../api/apiMethods';
import Loader from '../../components/loader/Loader';

const DetailedPlanet: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const val = id || '';
  const location = useLocation();

  const { data, isFetching } = planetsApi.useGetCurrentPlanetQuery({
    id: val,
  });

  return (
    <>
      {isFetching && <Loader />}
      <div className="detailed__wrapper">
        <div className="detailed__left">
          <img src={data?.imageUrl} alt="" />
        </div>
        <div className="detailed__right">
          <h1>{data?.name}</h1>
          <p>Diameter: {data?.diameter}km</p>
          <p>Rotation Period: {data?.rotation_period} days</p>
          <p>Orbital Period: {data?.orbital_period} days</p>
          <p>Gravity: {data?.gravity} </p>
          <p>Population: {data?.population}</p>
          <p>Climate: {data?.climate}</p>
          <p>Terrain: {data?.terrain}</p>
          <p>Surface Water: {data?.surface_water}%</p>
        </div>

        <Link to={`/${location.search}`}>
          <Button className="detailed_close">close</Button>
        </Link>
      </div>
    </>
  );
};

export default DetailedPlanet;
