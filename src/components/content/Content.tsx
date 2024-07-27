import React from 'react';
import { PlanetWithImage } from '../../api/types';
import Card from '../card/Card';
import './Content.css';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import CheckBox from '../ui-kit/CheckBox';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import {
  addPlanetIntoArray,
  removeChoosenPlanet,
} from '../../store/slices/planetsSliice';
import ModalFlyout from '../ModalFlyout/ModalFlyout';

interface ContentProps {
  planets: PlanetWithImage[] | undefined;
}

const Content: React.FC<ContentProps> = ({ planets }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { choosenPlanets } = useAppSelector((state) => state.planets);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.card') || target.closest('.detailed__wrapper')) {
      return;
    }

    if (
      location.pathname.includes('/card/') &&
      !target.closest('.detailed__wrapper')
    ) {
      navigate(-1);
    }
  };

  const handleChangeCheckbox = (planet: PlanetWithImage) => {
    const existingPlanet = choosenPlanets.includes(planet);

    if (existingPlanet) {
      dispatch(removeChoosenPlanet(planet));
    } else {
      dispatch(addPlanetIntoArray(planet));
    }
  };

  return (
    <main className="content__wrapper" onClick={handleClick}>
      {choosenPlanets.length > 0 && <ModalFlyout />}
      <div data-testid="planets-list" className="planets__list">
        {planets?.map((planet: PlanetWithImage, index) => {
          const id = planet.url.split('/').slice(-2, -1)[0];

          return (
            <div className="card_link__wrapper" key={planet.name + index}>
              <Link to={`/card/${id}/${location.search}`}>
                <Card key={planet.name + index} {...planet} />
              </Link>

              <CheckBox
                checked={choosenPlanets.some(
                  (choosen) => choosen.name === planet.name
                )}
                onChange={() => handleChangeCheckbox(planet)}
              />
            </div>
          );
        })}

        {!planets?.length && (
          <div className="plenets__notfound">
            It seems that such a planet is not on our list
          </div>
        )}
      </div>
      <Outlet />
    </main>
  );
};

export default Content;
