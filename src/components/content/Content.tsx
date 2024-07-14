import React from 'react';
import { PlanetWithImage } from '../../api/apiMethods';
import Card from '../card/Card';
import './Content.css';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

interface ContentProps {
  planets: PlanetWithImage[];
}

const Content: React.FC<ContentProps> = ({ planets }) => {
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <main className="content__wrapper" onClick={handleClick}>
      <div data-testid="planets-list" className="planets__list">
        {planets.map((planet: PlanetWithImage, index) => {
          const id = planet.url.split('/').slice(-2, -1)[0];

          return (
            <Link
              key={planet.name + index}
              to={`/card/${id}/${location.search}`}
            >
              <Card key={planet.name + index} {...planet} />
            </Link>
          );
        })}

        {!planets.length && (
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
