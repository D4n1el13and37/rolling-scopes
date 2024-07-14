import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getCurrentPlanet, PlanetWithImage } from '../../api/apiMethods';
import Button from '../../components/ui-kit/Button';

import './DetailedPlanet.css';
import { LoadingState } from '../Home/Home';

const DetailedPlanet: React.FC<LoadingState> = ({ setIsLoading }) => {
  const { id } = useParams<{ id: string }>();
  const [planetData, setPlanetData] = useState<PlanetWithImage>();
  const location = useLocation();

  const getPlanet = useCallback(async () => {
    setIsLoading(true);
    try {
      const val = id || '';
      const res = await getCurrentPlanet(val);
      setPlanetData(res);
    } catch (error) {
      console.error('Error fetching planets:', error);
    } finally {
      setIsLoading(false);
    }
  }, [id, setIsLoading]);

  useEffect(() => {
    getPlanet();
  }, [getPlanet]);

  return (
    <div className="detailed__wrapper">
      <div className="detailed__left">
        <img src={planetData?.imageUrl} alt="" />
      </div>
      <div className="detailed__right">
        <h1>{planetData?.name}</h1>
        <p>Diameter: {planetData?.diameter}km</p>
        <p>Rotation Period: {planetData?.rotation_period} days</p>
        <p>Orbital Period: {planetData?.orbital_period} days</p>
        <p>Gravity: {planetData?.gravity} </p>
        <p>Population: {planetData?.population}</p>
        <p>Climate: {planetData?.climate}</p>
        <p>Terrain: {planetData?.terrain}</p>
        <p>Surface Water: {planetData?.surface_water}%</p>
      </div>

      <Link to={`/${location.search}`}>
        <Button className="detailed_close">close</Button>
      </Link>
    </div>
  );
};

export default DetailedPlanet;
