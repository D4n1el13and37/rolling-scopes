import React from 'react';
import { PlanetWithImage } from '../../api/apiMethods';
import Card from '../card/Card';
import './Content.css';
import { Link, Outlet } from 'react-router-dom';

interface ContentProps {
  planets: PlanetWithImage[];
}

const Content: React.FC<ContentProps> = ({ planets }) => {
  return (
    <div className="content__wrapper">
      <div className="planets__list">
        {planets.map((planet: PlanetWithImage, index) => {
          const id = planet.url.split('/').slice(-2, -1)[0];

          return (
            <Link key={planet.name + index} to={`card/${id}`}>
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
    </div>
  );
};

export default Content;
