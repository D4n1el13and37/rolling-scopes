import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCurrentPlanet, PlanetWithImage } from '../../api/apiMethods';

import './DetailedPlanet.css';
import Button from '../../components/ui-kit/Button';
import Loader from '../../components/loader/Loader';

const DetailedPlanet = () => {
  const { id } = useParams<{ id: string }>();
  const [planetData, setPlanetData] = useState<PlanetWithImage>();
  // need to rework
  const [isLoading, setIsLoading] = useState(false);

  const getPlanet = useCallback(async () => {
    setIsLoading(true);
    try {
      const val = id || '';
      const res = await getCurrentPlanet(val);

      setPlanetData(res);
      // need to rework
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching planets:', error);
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getPlanet();
  }, [getPlanet]);

  return (
    <div className="detailed__wrapper">
      {/** must be at top level, at parent component */}
      {isLoading && <Loader />}
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

      {/** should i refactor it?*/}
      <Link to={'/'}>
        <Button className="detailed_close">close</Button>
      </Link>
    </div>
  );
};

export default DetailedPlanet;
